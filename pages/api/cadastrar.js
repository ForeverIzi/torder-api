import dbConnect from "../../utils/dbConnect"; 
import Usuario from '../../models/Usuario';
import Cliente from '../../models/Cliente';
import Restaurante from "../../models/Restaurante";
import gerarToken from './gerarToken';

dbConnect();

export default async(req, res) => {
    const { method } = req;
    switch(method){
        case 'POST':
            const { email, senha, ehAdminRestaurante} = req.body;
            try{
                if(await Usuario.findOne({email})){
                    return res.status(400).json({success: false, message: "Email já cadastrado!"});
                }
                if(ehAdminRestaurante == undefined && ehAdminRestaurante == null){
                    ehAdminRestaurante = false;
                }

                if(!ehAdminRestaurante){
                    const cliente = await Cliente.create(req.body);
                    const usuarioData = req.body;
                    usuarioData['cliente'] = cliente.id;
                    const usuario = await Usuario.create(usuarioData);
                    return res.status(201).json({success: true, usuario: usuario, token: gerarToken({ idUsuario: usuario.id, idCliente: usuario.cliente})})
                }else{
                    
                    const restaurante = await Restaurante.create(req.body);
                    const usuarioData = req.body;
                    usuarioData['restaurante'] = restaurante.id;
                    const usuario = await Usuario.create(usuarioData);
                    return res.status(201).json({success: true, usuario: usuario, token: gerarToken({ idUsuario: usuario.id, idRestaurante: usuario.restaurante})})
                }

                return res.status(400).json({success: false, message: 'Campo ehAdminRestaurante precisa ser passado.'});
                
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao cadastrar Usuario! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }
}

