import axios from 'axios'
import client from './client'

const URLs = {
    list: 'list',
    create: 'create',
    delete: 'delete',
    update: 'update',
}

let books = {};

var instance = axios.create({
    baseURL: '/api/books',
    timeout: 3000,
});

books.getlist = function (params, success) {
    instance.get(URLs.list, {params: params}).then((response) => {
        if (success !== undefined) {
            success(response.data.data)
        }
    }).catch(client.message);
};


books.deleteBook = function (id, success) {
    instance.put(URLs.delete, {id: id}).then((response) => {
        if (success !== undefined) {
            success(response.data)
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e)
        } else {
            client.message(e)
        }
    });
};

books.createBook = function (params, success, error) {
    instance.post(URLs.create, params).then((response) => {
        if (success !== undefined) {
            success(response.data)
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e)
        } else {
            client.message(e)
        }
    });
};

books.updateBook = function (params, success, error) {
    instance.put(URLs.update, params).then((response) => {
        if (success !== undefined) {
            success(response.data)
        }
    }).catch((e) => {
        if (error !== undefined) {
            error(e)
        } else {
            client.message(e)
        }
    });
};

export default books;
