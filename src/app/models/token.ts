export interface TokenDTO {
    expiresAt: Date | null;
    refreshToken: string;
    token: string;
}