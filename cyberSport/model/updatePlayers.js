import model             from '../../model/model';
import savePlayers       from './savePlayers';
import saveCups          from './saveCups';
import savePlayerHistory from './savePlayerHistory';
import getMaxId          from '../../libs/getMaxId';

export default updatePlayers;

let getIdForPlayerCup;

/**
 * @function
 * @name updatePlayers
 * @description
 * Обновляет данные о игроках.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object[]} players Массив объектов с информацией о игроках.
 * @param {object[]} teams Массив объектов с информацией о командах.
 * @param {object[]} events Массив объектов с информацией о турнирах.
 **/
async function updatePlayers(tables, players, teams, events) {
    const playersInDb = await model.findAll(tables.player, {});
    let   id          = getMaxId(playersInDb, 'player_id');
    const historyInDb = await model.findAll(tables.playerRatingHistory, {});
    let   historyId   = getMaxId(historyInDb, 'rating_id');
    getIdForPlayerCup = await getIdForCups(tables);

    players.forEach(async function (item) {
        const player = playersInDb.find(function (playerInDb) {
            return item.nick === playerInDb.nick && item.gameId === playerInDb.game_id;
        });

        if (player) {
            await updateRating(tables.player, item, player);
            historyId++;
            await addNewRatingForHistory(tables.playerRatingHistory, item, player, historyId);
            await updatePlayerHistory(tables, item, player, teams, events);
        }
        else {
            id++;
            item.id = id;
            item.history = [];
            await savePlayers(tables, [ item ]);
        }
    });
}

/**
 * @function
 * @name updateRating
 * @description
 * Обновляет рейтинг игрока.
 *
 * @param {object} table Объект с объектами таблиц.
 * @param {object} player Объект только распаршеного игрока.
 * @param {object} playerInDb Объект игрока из базы данных.
 **/
async function updateRating(table, player, playerInDb) {
    if (+player.rating !== +playerInDb.rating) {
        await model.update(table, { player_id : playerInDb.player_id }, { rating : +player.rating });
    }
}

/**
 * @function
 * @name updatePlayerHistory
 * @description
 * Обновляет истории игр игрока в командах.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object} player Объект только распаршеного игрока.
 * @param {object} playerInDb Объект игрока из базы данных.
 * @param {object[]} teams Массив объектов с информацией о командах.
 * @param {object[]} events Массив объектов с информацией о турнирах.
 **/
async function updatePlayerHistory(tables, player, playerInDb, teams, events) {
    if (player.history && player.history.length > 0) {
        const playerHistoriesInDb = await model.findAll(tables.playerHistory, { player_id : playerInDb.player_id });
        const allHistories        = await model.findAll(tables.playerHistory, {});
        let   id                  = getMaxId(allHistories, 'history_id');

        player.history.forEach(async function (item) {
            const history = playerHistoriesInDb.find(function (playerHistoryInDb) {
                return new Date(item.dateIn).valueOf() === playerHistoryInDb.date_in.valueOf();
            });

            if (history) {
                await updateWins(tables.playerHistory, item, history);
                await updateTies(tables.playerHistory, item, history);
                await updateLoses(tables.playerHistory, item, history);
                await updateDateOut(tables.playerHistory, item, history);
                await updateCups(tables, item, playerInDb, history, events);
            }
            else {
                id++;
                item.historyID = id;
                id++;
                item.cups = [];
                item.playerID = playerInDb.player_id;
                item.teamID = await getTeamId(teams, item.teamID, tables);
                if (item.teamID !== 0) {
                    await savePlayerHistory(tables, [ item ]);
                }
            }
        });
    }
}

/**
 * @function
 * @name getTeamId
 * @description
 * Возращает id команды в бд.
 *
 * @param {object[]} teams Массив команд.
 * @param {number} id Id команды.
 * @param {object} tables Объект с объектом таблицы.
 **/
async function getTeamId(teams, id, tables) {
    const team = teams.find(function (item) {
        return +item.id === +id;
    });

    if (team) {
        const teamsInDb = await model.findAll(tables.team, {});
        const teamInDb = teamsInDb.find(function (item) {
            return team.name === item.name && team.gameId === item.game_id;
        });

        if (teamInDb) {
            return +teamInDb.team_id;
        }
    }

    return 0;
}

/**
 * @function
 * @name updateWins
 * @description
 * Обновляет количество побед в истории игрока за команду.
 *
 * @param {object} table Объект с объектом таблицы.
 * @param {object} history Объект только распаршеной истории игрока.
 * @param {object} historyInDb Объект истории игрока из базы данных.
 **/
async function updateWins(table, history, historyInDb) {
    if (+history.wins !== +historyInDb.win) {
        await model.update(table, { history_id : historyInDb.history_id }, { win : +history.wins });
    }
}

/**
 * @function
 * @name updateTies
 * @description
 * Обновляет количество ничьих в истории игрока за команду.
 *
 * @param {object} table Объект с объектом таблицы.
 * @param {object} history Объект только распаршеной истории игрока.
 * @param {object} historyInDb Объект истории игрока из базы данных.
 **/
async function updateTies(table, history, historyInDb) {
    if (+history.ties !== +historyInDb.tie) {
        await model.update(table, { history_id : historyInDb.history_id }, { tie : +history.ties });
    }
}

/**
 * @function
 * @name updateLoses
 * @description
 * Обновляет количество поражений в истории игрока за команду.
 *
 * @param {object} table Объект с объектом таблицы.
 * @param {object} history Объект только распаршеной истории игрока.
 * @param {object} historyInDb Объект истории игрока из базы данных.
 **/
async function updateLoses(table, history, historyInDb) {
    if (+history.loses !== +historyInDb.lose) {
        await model.update(table, { history_id : historyInDb.history_id }, { lose : +history.loses });
    }
}

/**
 * @function
 * @name updateDateOut
 * @description
 * Обновляет дату выхода игрока из команды.
 *
 * @param {object} table Объект с объектом таблицы.
 * @param {object} history Объект только распаршеной истории игрока.
 * @param {object} historyInDb Объект истории игрока из базы данных.
 **/
async function updateDateOut(table, history, historyInDb) {
    if (new Date(history.dateOut).valueOf() !== historyInDb.date_out.valueOf()) {
        await model.update(table, { history_id : historyInDb.history_id }, { date_out : new Date(history.dateOut) });
    }
}

/**
 * @function
 * @name updateCups
 * @description
 * Обновляет истории турниров игрока в команде.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object} history Объект только распаршеней истории игрока.
 * @param {object} playerInDb Объект игрока из базы данных.
 * @param {object} historyInDb Объект истории игрока из базы данных.
 * @param {object[]} events Массив объектов с информацией о турнирах.
 **/
async function updateCups(tables, history, playerInDb, historyInDb, events) {
    if (history.cups && history.cups.length > 0) {
        const cupsInDb = await model.findAll(tables.cup, {
            player_id  : playerInDb.player_id,
            history_id : historyInDb.history_id
        });
        if (history.cups.length !== cupsInDb.length) {
            history.cups.forEach(async function (item) {
                let cup = false;
                for (let i = 0; i < cupsInDb.length; i++) {
                    const eventId = await getEventId(events, item.eventID, tables);
                    if (eventId === cupsInDb[i].event_id) {
                        cup = true;
                    }
                }

                if (!cup) {
                    item.cupID     = getIdForPlayerCup();
                    item.playerID  = playerInDb.player_id;
                    item.eventID   = await getEventId(events, item.eventID, tables);
                    item.historyID = historyInDb.history_id;
                    await saveCups(tables, [ item ]);
                }
            });
        }
    }
}

/**
 * @function
 * @name getIdForCups
 * @description
 * Возрашает уникальный новый id для турнира в базе.
 *
 * @param {object} tables Объект с объектом таблицы.
 **/
async function getIdForCups(tables) {
    const allCups   = await model.findAll(tables.cup, {});
    let   maxIdCups = getMaxId(allCups, 'cup_id');
    
    return function () {
        return ++maxIdCups;
    }
}

/**
 * @function
 * @name getEventId
 * @description
 * Возращает id турнира в бд.
 *
 * @param {object[]} events Массив турниров.
 * @param {number} id Id турнира.
 * @param {object} tables Объект с объектом таблицы.
 **/
async function getEventId(events, id, tables) {
    const event = events.find(function (item) {
        return +item.id === +id;
    });

    if (event) {
        const eventsInDb = await model.findAll(tables.event, {});
        const eventInDb = eventsInDb.find(function (item) {
            return event.name === item.name;
        });

        if (eventInDb) {
            return +eventInDb.event_id;
        }
    }

    return 0;
}

/**
 * @function
 * @name addNewRatingForHistory
 * @description
 * Добавляет изменёный рейтинг игрока в таблицу с историей рейтинга игрока.
 *
 * @param {object} table Объект таблици.
 * @param {object} player Объект только распаршенего игрока.
 * @param {object} playerInDb Объект игрока из базы данных.
 * @param {number} id Id для новой записи.
 **/
async function addNewRatingForHistory(table, player, playerInDb, id) {
    await model.save(table, {
        rating_id : id,
        date      : new Date(),
        rating    : +player.rating,
        player_id  : playerInDb.player_id
    });
}