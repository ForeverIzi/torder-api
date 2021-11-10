import dbConnect from "../../../utils/dbConnect"; 
import Reserva from '../../../models/Reserva';
import Mesa from "../../../models/Restaurante";
import Cliente from "../../../models/Cliente";


dbConnect();

export default async(req, res) => {
    const{ query: { id }, method } = req;

    switch(method){
        case 'GET':
            try{
                const reserva = await Reserva.findById(id).populate([{ path: 'mesa', model: Mesa },{ path: 'cliente', model: Cliente } ]);
                if(!reserva){
                    return res.status(400).json({success: false});
                }

                return res.status(200).json({success: true, reserva: reserva});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao obter reserva! ${error}`});
            }
            break;
        case 'PUT':
            try{
                const reserva = await Reserva.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if(!Reserva){
                    return res.status(400).json({success: false, message: `Falha ao atualizar reserva! ${error}`});
                }
                return res.status(200).json({success: true, reserva: reserva});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao atualizar reserva! ${error}`});
            }
            break;
        case 'DELETE':
            try{
                const deletedReserva = await Reserva.deleteOne({ _id: id});
                if(!deletedReserva){
                    return res.status(400).json({success: false, message: `Falha ao remover reserva! ${error}`});
                }

                return res.status(200).json({success: true, reserva: {}});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao remover reserva! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }   
}