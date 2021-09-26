const dataShema = require('../models/dataShema')

exports.index = async (req, res, next) => {

    try {
        const student = await dataShema.find();

        res.status(200).json({ 
            data: student
        });
    } catch (error) {
        next(error);
    }
  }

exports.insert = async (req, res, next) => {

    const { student_id, name, year } = req.body
    
    try {
        let student = new dataShema({
            student_id: student_id,
            name: name,
            year: year
        })
    
        await student.save();
    
        res.status(201).json({ 
            message: "Add New Student Success."
        });
    } catch (error) {
        next(error);
    }
  }

exports.show = async (req, res, next) => {

    try{
        const { id } = req.params
        const student = await dataShema.findById(id);

        if(!student){
            const error = new Error('Student data not found');
            error.code = 400;
            throw error
        }
    
        res.status(200).json({ 
            data: student
        });
    }catch(error){
        next(error);
    }
  }

exports.delete = async (req, res, next) => {

    try{
        const { id } = req.params
        const student = await dataShema.deleteOne({_id:id})

        if(student.deletedCount === 0){
            const error = new Error('Student data not found');
            error.code = 400;
            throw error
        }else{
            res.status(200).json({ 
                data: 'Delete Student Success'
            });
        }
    }catch(error){
        next(error);
    }
  }


exports.update = async (req, res, next) => {

    try{
        const { id } = req.params
        const { student_id, name, year } = req.body

        const student = await dataShema.updateOne({_id:id},{
            student_id: student_id,
            name: name,
            year: year
        });

        if(student.modifiedCount === 0){
            const error = new Error('Student data not Update');
            error.code = 400;
            throw error
        }else{
            res.status(200).json({ 
                data: 'Update Student Data Success'
            });
        }
    }catch(error){
        next(error);
    }

  }