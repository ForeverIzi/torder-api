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
            const { email, senha, ehAdminRestuarante} = req.body;
            try{
                if(await Usuario.findOne({email})){
                    return res.status(400).json({success: false, message: "Email já cadastrado!"});
                }

                if(!req.body.ehAdminRestuarante && req.body.ehAdminRestuarante != undefined){
                    const cliente = await Cliente.create(req.body);
                    const usuarioData = req.body;
                    usuarioData['cliente'] = cliente.id;
                    const usuario = await Usuario.create(usuarioData);
                    res.status(201).json({success: true, usuario: usuario, token: gerarToken({ idUsuario: usuario.id, idCliente: usuario.cliente})})
                }
                    
                if(req.body.ehAdminRestuarante && req.body.ehAdminRestuarante != undefined){
                    const cliente = await Cliente.create(req.body);
                    const usuarioData = req.body;
                    usuarioData['restraurante'] = restaurante.id;
                    const usuario = await Usuario.create(usuarioData);
                    res.status(201).json({success: true, usuario: usuario, token: gerarToken({ idUsuario: usuario.id, idRestaurante: usuario.restaurante})})
                }
                
                res.status(400).json({success: false, message: 'Campo ehAdminRestaurante precisa ser passado.'});
                
            }catch(error){
                res.status(400).json({success: false, message: `Falha ao cadastrar Usuario! ${error}`});
            }
            break;
        default:
            res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }
}

