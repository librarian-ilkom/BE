const db = require('../../utils/db.setup.util')
const { getValidLimit } = require('../../utils/books.util')
const { book } = db.models

module.exports = {
    get: async(req, res, next) => {
        try {

            const queryOptions = {
                ...getValidLimit(req.query.size, req.query.page),
                ...{order : [['createdAt', 'DESC']]}
            }

            const response = await book.findAll(queryOptions);
            return res.status(200).json({
                success: true,
                code: 200,
                message: "Get all books successfully",
                data: response
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                code: 500,
                message: "Internal server error"
            })

        }
    },

    getId: async(req, res, next) => {
        try {
            const response = await book.findOne({
                where: {
                    idBuku: req.params.id
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: `Get book with id ${req.params.id} successfully`,
                data: response
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: 500,
                message: error.message
            })
        }
    },

    insert: async(req, res, next) => {
        try {
            const response = await book.create({
                idBuku: req.body.idBuku,
                idKategori: req.body.idKategori,
                judulBuku: req.body.judulBuku,
                pengarang: req.body.pengarang,
                penerbit: req.body.penerbit,
                tahunTerbit: req.body.tahunTerbit,
                jumlahHalaman: req.body.jumlahHalaman,
                deskripsi: req.body.deskripsi,
                imgURL: req.body.imgURL
            });

            return res.status(201).json({
                success: true,
                code: 201,
                message: "Create new book successfully",
                data: response
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: 500,
                message: error.message
            })
        }
    },

    updateId: async(req, res, next) => {
        try {
            const idBuku = req.params.id
            const response = await book.update({
                judulBuku: req.body.judulBuku,
                pengarang: req.body.pengarang,
                penerbit: req.body.penerbit,
                tahunTerbit: req.body.tahunTerbit,
                jumlahHalaman: req.body.jumlahHalaman,
                deskripsi: req.body.deskripsi,
                imgURL: req.body.imgURL
            }, {
                where: {
                    idBuku: idBuku
                }
            });

            if (response == 0)
                return res.status(404).json({
                    success: false,
                    code: 404,
                    message: "Book not found"
                })

            const getData = await book.findOne({
                where: {
                    idBuku: idBuku
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Updated book successfully",
                data: getData
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: 500,
                message: error.message
            })
        }
    },

    remove: async(req, res, next) => {
        try {
            await book.destroy({
                where: {
                    idBuku: req.params.id
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Deleted book successfully",
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: 500,
                message: error.message
            })
        }
    },
}