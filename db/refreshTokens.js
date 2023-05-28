export let refreshTokens = [];

export const removeRefreshToken = (token) => {
    refreshTokens = refreshTokens.filter((t) => t !== token);
}