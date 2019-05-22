var Product = require('../models/product');
require('mongoose-pagination');

exports.getList = function (req, resp) {
    var page = req.query.page;
    var limit = req.query.limit;
    var responseData;
    Product.find().paginate(parseInt(page), parseInt(limit),
        function (err, listData, totalItem) {
            responseData = {
                'listData': listData,
                'totalPage': Math.ceil(totalItem / limit),
                'page': page,
                'limit': limit
            };
            resp.render('admin/product/list', responseData);
        });
}

// trả về form.
exports.create = function (req, resp) {
    var responseData = {
        'action': '/admin/products/create',
        'obj': new Product()
    }
    resp.render('admin/product/form', responseData);
}

// lưu trữ thông tin.
exports.save = function (req, resp) {
    var obj = new Product(req.body);
    obj.save(function (err) {
        if (err) {
            return resp.status(500).send(err);
        } else {
            return resp.redirect('/admin/products/list');
        }
    });
}

// lấy chi tiết.
exports.getDetail = function (req, resp) {
    Product.findById(req.params.id, function (err, obj) {
        if (err) {
            return res.status(500).send(err);
        } else {
            var responseData = {
                'obj': obj
            };
            resp.render('admin/product/detail', obj);
        }
    });
}

// đưa về trang sửa sản phẩm với thông tin cũ của sản phẩm đó.
exports.edit = function (req, resp) {
    Product.findById(req.params.id, function (err, obj) {
        if (err) {
            return res.status(500).send(err);
        } else {
            var responseData = {
                'action': '/admin/products/edit/' + req.params.id,
                'obj': obj
            };
            resp.render('admin/product/form', responseData);
        }
    });
}

// lưu thông tin sản phẩm sau khi sửa.
exports.update = function (req, resp) {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: false},
        function (err, obj) {
        if (err) {
            return res.status(500).send(err);
        } else {
            resp.redirect('/admin/products/list');
        }
    });
}

// xóa sản phẩm.
exports.delete = function (req, resp) {
    Product.findByIdAndUpdate(
        req.params.id,
        {
            'status': -1
        },
        {
            new: false
        },
        function (err, obj) {
            if (err) {
                return res.status(500).send(err);
            } else {
                resp.redirect('/admin/products/list');
            }
        });
}