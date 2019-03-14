/**
 * 路由中间件封装，基于 koa-router
 */

'use strict';

const path = require('path');
const _ = require('lodash');
const router = require('koa-router')();

const logger = require('../../utils/logger');
const rRoute = /^(get|put|post|patch|delete)\s+(.+)\s+=>\s+([a-z][\w.-]*)#([a-z][\w.-]*)$/i;
const log = logger.createLogger('app:router');

const DEFAULT_AREA = '_default';

const parseRoute = (route) => {
    const matches = rRoute.exec(route);
    if (matches && matches.length === 5) {
        return {
            method: matches[1].toLowerCase(),
            path: matches[2],
            controller: matches[3],
            action: matches[4],
        };
    } else
        return null;
};

const buildRouteTable = (originRoutes) => {
    const routeTable = [];
    const builder = (routes, area) => {
        log.debug(`Building route table for area "${area}"`);
        routes.forEach((route) => {
            if (_.isString(route)) {
                const routeData = parseRoute(route);
                if (routeData) {
                    routeData.area = area;
                    routeData.rule = route;
                    routeTable.push(routeData);
                    log.debug(`Route ${route} parse to ${JSON.stringify(routeData)}`);
                } else
                    throw Error(`Route format invalid: "${route}"`);
            } else if (_.isPlainObject(route))
                builder(route.routes, route.area);
            else
                throw Error(`Route format invalid: "${route}"`);
        });
    };

    builder(originRoutes, DEFAULT_AREA);

    return routeTable;
};

module.exports = (app, options) => {
    const root = options.root || process.cwd();
    const controllerPathBase = path.resolve(root, options.controller);
    const routes = require(path.resolve(root, options.routes));
    const routeTable = buildRouteTable(routes);
    routeTable.forEach((route) => {
        let urlPath = route.path;
        let controllerPath = route.controller;
        if (route.area && route.area !== DEFAULT_AREA) {
            controllerPath = path.join(route.area, controllerPath);
            urlPath = (`/${route.area}/${urlPath}`).replace(/\/+/g, '/');
        }
        let controller = null;
        try {
            controller = require(path.join(controllerPathBase, controllerPath));
        } catch (error) {
            log.error(`Load controller ${controllerPath} error, please check route config`);
            throw error;
        }
        if (controller && controller[route.action]) {
            router[route.method](urlPath, controller[route.action]);
            log.info(`Mapped: ${route.method} ${urlPath} to ${controllerPath}.${route.action}`);
        } else
            log.warn(`Can not find action ${route.action} in controller ${controllerPath}, ignoring route rule "${route.rule}"`);
    });

    app.use(router.routes()).use((router.allowedMethods()));
};
