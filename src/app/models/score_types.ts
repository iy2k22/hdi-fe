export interface ScoreType {
    id: number;
    name: string;
    min: number;
    max: number;
    step: number;
    round: number;
    ascending: boolean;
}

export interface ScoreTypeAddDTO extends ScoreType {
    editing: boolean;
}