EPICS_IPS = "172.17.2.36 172.17.2.31"

# The index dictionary maps the PV record name to the variable used by the JS
# at the client and also the section name that will be updated
chan_dict = {
    "tcs:heartbeat":['tcs_hb', 'test_update'],
    "tcs:LST":['tcs_lst', 'test_update'],
    "ec:health":['ecs_hlth', 'ecs_update'],
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
    "ec:lightState":['lights_st', 'ecs_update']
}


