export interface Score {
    id: number;
    country: number;
    scoreValue: number;
    year: number;
    scoreType: number;
}

export interface ScoreAddDTO extends Score {
    editing: boolean;
    notRanked: boolean;
}