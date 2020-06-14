FROM registry-internal.cn-beijing.aliyuncs.com/luojilab/golang:1.8-govendor AS build-env

ENV ROOT_PATH /go/src/taskcenter-admin
WORKDIR $ROOT_PATH

ADD vendor $ROOT_PATH/vendor
RUN govendor sync -v

ADD . $ROOT_PATH
RUN go build -v -o /build/server


FROM registry-internal.cn-beijing.aliyuncs.com/luojilab/alpine:3.5

ENV APP_HOME /data/src
WORKDIR $APP_HOME

COPY assets $APP_HOME/assets
COPY docker $APP_HOME/docker
COPY conf $APP_HOME/conf

COPY --from=build-env /build/server /data/src/server

ENTRYPOINT ["docker/entrypoint.sh"]
CMD ["./server"]
