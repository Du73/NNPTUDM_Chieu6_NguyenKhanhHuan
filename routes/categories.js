var express = require('express');
var router = express.Router();
let { data } = require('../utils/data');
let slugify = require('slugify');
let { IncrementalId } = require('../utils/IncrementalIdHandler');

let categories = [
    {
        "id": 7,
        "name": "Clothes",
        "slug": "clothes",
        "image": "https://i.imgur.com/QkIa5tT.jpeg",
        "creationAt": "2026-02-05T16:51:34.000Z",
        "updatedAt": "2026-02-05T16:51:34.000Z"
    },
    {
        "id": 8,
        "name": "Electronics",
        "slug": "electronics",
        "image": "https://i.imgur.com/ZANVnHE.jpeg",
        "creationAt": "2026-02-05T16:51:35.000Z",
        "updatedAt": "2026-02-05T16:51:35.000Z"
    },
    {
        "id": 9,
        "name": "Furniture",
        "slug": "furniture",
        "image": "https://i.imgur.com/Qphac99.jpeg",
        "creationAt": "2026-02-05T16:51:36.000Z",
        "updatedAt": "2026-02-05T16:51:36.000Z"
    },
    {
        "id": 10,
        "name": "Shoes",
        "slug": "shoes",
        "image": "https://i.imgur.com/qNOjJje.jpeg",
        "creationAt": "2026-02-05T16:51:36.000Z",
        "updatedAt": "2026-02-05T16:51:36.000Z"
    },
    {
        "id": 11,
        "name": "Miscellaneous",
        "slug": "miscellaneous",
        "image": "https://i.imgur.com/BG8J0Fj.jpg",
        "creationAt": "2026-02-05T16:51:37.000Z",
        "updatedAt": "2026-02-05T16:51:37.000Z"
    },
    {
        "id": 13,
        "name": "gargantilla",
        "slug": "gargantilla",
        "image": "https://firebasestorage.googleapis.com/v0/b/pruebasalejandr...g?alt=media&token=6bbf8234-5112-4ca8-b130-5e49ed1f3140",
        "creationAt": "2026-02-05T21:09:36.000Z",
        "updatedAt": "2026-02-05T21:09:36.000Z"
    },
    {
        "id": 15,
        "name": "category_B",
        "slug": "category-b",
        "image": "https://pravatar.cc/",
        "creationAt": "2026-02-05T22:04:27.000Z",
        "updatedAt": "2026-02-05T22:04:27.000Z"
    },
    {
        "id": 16,
        "name": "string",
        "slug": "string",
        "image": "https://pravatar.cc/",
        "creationAt": "2026-02-05T22:04:28.000Z",
        "updatedAt": "2026-02-05T22:04:28.000Z"
    },
    {
        "id": 17,
        "name": "Anillos",
        "slug": "anillos",
        "image": "https://firebasestorage.googleapis.com/v0/b/pruebasalejandr...g?alt=media&token=b7de8064-d4eb-4680-a4e2-ad917838c6c8",
        "creationAt": "2026-02-06T02:40:20.000Z",
        "updatedAt": "2026-02-06T02:40:20.000Z"
    },
    {
        "id": 18,
        "name": "Testing Category",
        "slug": "testing-category",
        "image": "https://placeimg.com/640/480/any",
        "creationAt": "2026-02-06T06:04:54.000Z",
        "updatedAt": "2026-02-06T06:04:54.000Z"
    }
];

router.get('/', function(req, res, next) {
    let nameQ = req.query.name ? req.query.name : '';
    let result = categories.filter(function(e) {
        return (!e.isDeleted) && e.name.toLowerCase().includes(nameQ.toLowerCase());
    });
    res.send(result);
});

router.get('/:id', function(req, res, next) {
    let id = parseInt(req.params.id);
    let result = categories.find(function(e) {
        return (!e.isDeleted) && e.id === id;
    });
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send({ message: "ID NOT FOUND" });
    }
});

router.get('/slug/:slug', function(req, res, next) {
    let slug = req.params.slug;
    let result = categories.find(function(e) {
        return (!e.isDeleted) && e.slug === slug;
    });
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send({ message: "SLUG NOT FOUND" });
    }
});

router.post('/', function(req, res, next) {
    let newObj = {
        id: IncrementalId(categories),
        name: req.body.name,
        slug: slugify(req.body.name, { replacement: '-', lower: true, locale: 'vi' }),
        image: req.body.image,
        creationAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
    };
    categories.push(newObj);
    res.send(newObj);
});

router.put('/:id', function(req, res, next) {
    let id = parseInt(req.params.id);
    let result = categories.find(function(e) {
        return e.id === id;
    });
    if (result) {
        let body = req.body;
        let keys = Object.keys(body);
        for (const key of keys) {
            if (result[key] !== undefined) {
                result[key] = body[key];
            }
        }
        result.updatedAt = new Date(Date.now());
        res.send(result);
    } else {
        res.status(404).send({ message: "ID NOT FOUND" });
    }
});

router.delete('/:id', function(req, res, next) {
    let id = parseInt(req.params.id);
    let result = categories.find(function(e) {
        return e.id === id;
    });
    if (result) {
        result.isDeleted = true;
        res.send(result);
    } else {
        res.status(404).send({ message: "ID NOT FOUND" });
    }
});

router.get('/:id/products', function(req, res, next) {
    let id = parseInt(req.params.id);
    let result = data.filter(function(e) {
        return (!e.isDeleted) && e.category && e.category.id === id;
    });
    res.send(result);
});

module.exports = router;
