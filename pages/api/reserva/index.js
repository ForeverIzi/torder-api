import dbConnect from "../../../utils/dbConnect"; 
import Reserva from '../../../models/Reserva';
import Mesa from "../../../models/Mesa";
import Cliente from "../../../models/Cliente";

dbConnect();

export default async(req, res) => {
    const { method } = req;
    switch(method){
        case 'GET':
            try{
                const reservas = await Reserva.find().populate([ { path: 'cliente', model: Cliente }, { path: 'mesa', model: Mesa }]);
                res.status(200).json({success: true, data: reservas})
            }catch(error){
                res.status(400).json({success: false, massage: `Falha na obter reservas! ${error}`});
            }
            break;
        case 'POST':
            try{
                const reserva = await Reserva.create({...req.body, mesa: req.body.mesa, cliente: req.body.cliente});
                res.status(201).json({success: true, data: reserva})
            }catch(error){
                res.status(400).json({success: false, massage: `Falha na criação do reserva! ${error}`});
            }
            break;
        default:
            res.status(400).json({success: false, massage: "Requisição inválida"});
            break;
    }
}