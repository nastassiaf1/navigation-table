export interface FilterParam {
    minAge: string;
    maxAge: string;
    isVerified: boolean;
    name: string;
    id: string,
}

export enum FilterField {
    NAME = 'name',
    ID = 'id',
    MIN_AGE = 'minAge',
    MAX_AGE = 'maxAge',
    IS_VERIFIED = 'isVerified',
}
