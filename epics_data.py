# EPICS IOCs IP addresses for EPICS_CA_ADDR_LIST
EPICS_IPS = "172.17.2.36 172.17.2.31 172.17.2.61 172.17.2.30 172.17.2.32 \
    172.17.2.33"

# The index dictionary maps the PV record name to the variable used by the JS
# at the client and also the section name that will be updated
chan_dict = {
    "tcs:heartbeat":['tcs_hb', 'test_update'],
    "tcs:LST":['tcs_lst', 'test_update'],
    "ec:health.OMSS":['ecs_hlth', 'ecs_update'],
    "ec:state.OMSS":['ecs_state', 'ecs_update'],
    "ec:tsDriveStat":['ts_pwr', 'ecs_update'],
    "ec:topShtrState.OMSS":['ts_st', 'ecs_update'],
    "ec:topShtrPos":['ts_pos', 'ecs_update'],
    "ec:bsDriveStat":['bs_pwr', 'ecs_update'],
    "ec:botShtrState.OMSS":['bs_st', 'ecs_update'],
    "ec:botShtrPos":['bs_pos', 'ecs_update'],
    "ec:autocloseTimerState":['ac_st', 'ecs_update'],
    "ec:evgDriveStat":['evg_pwr', 'ecs_update'],
    "ec:eastVentGateState.OMSS":['evg_st', 'ecs_update'],
    "ec:eastVentGatePos":['evg_pos', 'ecs_update'],
    "ec:wvgDriveStat":['wvg_pwr', 'ecs_update'],
    "ec:westVentGateState.OMSS":['wvg_st', 'ecs_update'],
    "ec:westVentGatePos":['wvg_pos', 'ecs_update'],
    "ec:domeDriveStat":['dome_pwr', 'ecs_update'],
    "ec:domeState.OMSS":['dome_st', 'ecs_update'],
    "ec:parkDome.MESS":['dome_mess', 'ecs_update'],
    "ec:lightState":['elights_st', 'env_update'],
    "gis:tsrs:lightState":['vlights_st', 'env_update'],
    "mc:azStateS":['az_st', 'mcs_update'],
    "mc:azDriveCondition":['azdrv_st', 'mcs_update'],
    "mc:elStateS":['el_st', 'mcs_update'],
    "mc:elDriveCondition":['eldrv_st', 'mcs_update'],
    "gis:tsrs:crIsArmed":['crarm_st', 'crcs_update'],
    "cr:crStateS":['cr_st', 'crcs_update'],
    "cr:crDriveCondition":['crdrv_st', 'crcs_update'],
    "gis:mon:other:M1posxVibFlt":['pxvib_st', 'gis_update'],
    "gis:mon:other:M1negxVibFlt":['nxvib_st', 'gis_update'],
    "gis:mon:other:M1covVibSeq":['coverseq_st', 'gis_update'],
    "gis:mon:other:m1coversums.VAL":['cover_st', 'gis_update'],
    "gis:mon:other:m1instsums.VAL":['instcover_st', 'gis_update'],
}


