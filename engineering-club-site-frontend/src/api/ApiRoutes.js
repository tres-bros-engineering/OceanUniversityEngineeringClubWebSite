const BASE_URL = "http://localhost:3001/api";

const ApiRoutes = {
    SUPERADMIN : {
        GET: `${BASE_URL}/superadmin/get`,
        PATCH: `${BASE_URL}/superadmin/update`
    },
    ADMIN : {
        GET: `${BASE_URL}/admin/get`,
        CREATE: `${BASE_URL}/admin/create`,
        PATCH: `${BASE_URL}/admin/update`,
        DELETE: `${BASE_URL}/admin/delete`
    },
    ARTICLE : {
        GET: `${BASE_URL}/article/get`,
        CREATE: `${BASE_URL}/article/create`,
        PATCH: `${BASE_URL}/article/update`,
        DELETE: `${BASE_URL}/article/delete`
    },
    NEWS : {
        GET: `${BASE_URL}/news/get`,
        CREATE: `${BASE_URL}/news/create`,
        PATCH: `${BASE_URL}/news/update`,
        DELETE: `${BASE_URL}/news/delete`
    },
    COMMENT : {
        GET: `${BASE_URL}/comment/get`,
        CREATE: `${BASE_URL}/comment/create`,
        DELETE: `${BASE_URL}/comment/delete`
    }
}

export default ApiRoutes;