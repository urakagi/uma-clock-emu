export const DISTANCE = {
    SHORT: 1,
    MILE: 2,
    MIDDLE: 3,
    LONG: 4
}

export const STYLE = {
    NIGE: 1,
    SEN: 2,
    SASI: 3,
    OI: 4
}

export const SURFACE = {
    TURF: 1,
    DIRT: 2
}

export const DistanceLimit = {
    Short: [DISTANCE.SHORT],
    Mile: [DISTANCE.MILE],
    Middle: [DISTANCE.MIDDLE],
    Long: [DISTANCE.LONG],
}

export const StyleLimit = {
    Nige: [STYLE.NIGE],
    Sen: [STYLE.SEN],
    Sasi: [STYLE.SASI],
    Oi: [STYLE.OI],
    Front: [STYLE.NIGE, STYLE.SEN],
    Behind: [STYLE.SASI, STYLE.OI],
}

export const SurfaceLimit = {
    Turf: [SURFACE.TURF],
    Dirt: [SURFACE.DIRT]
}
