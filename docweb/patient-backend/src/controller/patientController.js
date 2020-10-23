
const Address = require('../models/address');
const Patient = require('../models/patient');
const sequelize = require('sequelize');

class PatientController {
    static addPateint = async (req, res) => {
        try {
            const address = await Address.create({ addressInfo: req.body.address });
            const patient = await Patient.create({
                name: req.body.name,
                age: req.body.age,
                phoneno: req.body.phoneno,
                address: address.id
            });
            patient['address'] = address;
            res.send(patient);
        } catch (e) {
            res.status(500).send(e);
        }
    };

    static getPatient = async (req, res) => {
        try {
            let patient = await Patient.findByPk(req.params.id);
            let address = await Address.findByPk(patient.address);
            patient['address'] = address;
            if (patient.isActive) {
                res.send(patient);
            } else {
                res.status(204).send({
                    error: {
                        message: 'User is deleted'
                    }
                });
            }
        } catch {
            res.status(500).send()
        }
    };

    static updatePateint = async (req, res, next) => {
        const patientValuesToUpate = ['name', 'age', 'phoneno'];
        try {
            const patient = await Patient.findByPk(req.params.id);
            if (!patient) {
                return res.status(400).send('Could not find id');
            }
            const patientUpdates = {};
            patientValuesToUpate.map(e => {
                if (req.body.hasOwnProperty(e)) {
                    patientUpdates[e] = req.body[e];
                }
            });
            const updatedPatient = await Patient.update(patientUpdates, { where: { id: req.params.id } });
            if (req.body.hasOwnProperty('address')) {
                const address = await Address.update({ 'addressInfo': req.body.address }, { where: { id: patient.address } });
                updatedPatient['address'] = address;
            }
            this.getPatient(req, res);
        } catch {
            res.status(500).send();
        }
    };

    static deletePatient = async (req, res) => {
        try {
            const patient = await Patient.findByPk(req.params.id);
            patient.isActive = false;
            await patient.save();
            if (!patient) {
                return res.status(400).send('Could not find id');
            }
            res.send({message: 'Patient marked inactive'});
        } catch (e) {
            res.status(500).send(e);
        }
    };

    static getAllPatients = async (req, res) => {
        try {
            const query = req.query;
            const findQuery = {
                limit: +query.limit || 10,
                offset: +query.offset || 0,
                order: [['updatedAt', 'DESC']],
                where: {isActive: true}
            };
            if (query.name) {
                findQuery['where'] = {isActive: true, name: {[sequelize.Op.like]: '%' + query.name + '%'}};
            }
            const patients = await Patient.findAndCountAll(findQuery);

            res.status(200).send(patients);
        } catch (e) {
            res.status(500).send(e);
        }
    };

    static getAllAddresses = async (req, res) => {
        try {
            const ids = req.body.ids;
            if (!ids || ids.length === 0) {
                return res.status(400).send('received wrong input');
            }
            const addresses = await Address.findAll({
                where: {id: ids}
            });
            const a = {};
            addresses.forEach(element => {
                a[element.id] = element;
            });
            res.status(200).send(a);
        } catch (e) {
            res.status(500).send(e);
        }
    };
}

module.exports = PatientController;