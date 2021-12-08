module.exports = (res, data, message = 'Success', code = 0) => {
    if (data && data.isBoom && data.isBoom == true) {
        const error = data.output.payload;
        const statusCode = data.output.statusCode;
        if (data.data != null) {
            error.data = data.data;
        }
        res.status(200).json({
            status: statusCode,
            message: error.message
        })

    } else {
        const response = {
            status: 200,
            message,
            data,
        };
        res.status(200).json(response);
    }
};