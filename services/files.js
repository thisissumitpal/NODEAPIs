const path = require('path');
module.exports = {
    userImageUpload: async (file) => {
        try {
            let fileName = 'usr' + Date.now() + path.extname(file.name);
            file.mv('./storage/' + fileName);
            return fileName;
        }
        catch (error) {
            return 0
        }
    },

    uplodeFile: async (file, file_path) => {
        try {
            let fileName = 'file' + Date.now() + path.extname(file.name);
            file.mv(file_path + fileName);
            return fileName;
        }
        catch (error) {
            //console.log(error);
            return false;
        }
    },
}