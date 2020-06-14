#!/bin/sh

run_pre() {
    mkdir -p /data/logs
}

run_post() {
    cd /data/src/conf
    mv ${CONFIG_BRANCH}.toml local.toml
    rm -rf /tmp/*
    cd /data/src
}

run_in_testing() {
    run_pre
    export CONFIG_BRANCH="release"
    # simulation actions
    run_post
}

run_in_simulation() {
    run_pre
    export CONFIG_BRANCH="premaster"
    # simulation actions
    run_post
}

run_in_production() {
    run_pre
    export CONFIG_BRANCH="master"
    # production actions
    # oneapm-daemon
    run_post
}

case ${RUN_ENV:=simulation} in
    production)
        echo "production"
        run_in_production
        ;;
    simulation)
        echo "simulation"
        run_in_simulation
        ;;
    testing)
        echo "testing"
        run_in_testing
        ;;
    develop)
        echo "develop"
        run_in_testing
        ;;
    *)
        echo "default"
        run_in_simulation
        ;;
esac

exec "$@"
