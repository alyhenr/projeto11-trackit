export const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/";

export const TODAY_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";

export const HABITS_LIST_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

export const CREATE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

export const DELETE_URL = id =>
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;

export const CHECK_HABIT_URL = id =>
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;

export const UNCHECK_HABIT_URL = id =>
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;