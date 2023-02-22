import { useState, useEffect } from "react";
import axios from "axios";
import { url, urlDescripcion,urlTipos, urlEvolucion } from "./importData";



let id = prompt("dime tu pokemon perra")
function App (){
  const [nodamagefrom, setNodamagefrom] = useState([]);
  const [nodamageto, setNodamageto] = useState([]);
  const [halfdamagefrom, setHalfdamagefrom] = useState([]);
  const [halfdamageto, setHalfdamageto] = useState([]);
  const [dobbledamagefrom, setDobbledamagefrom] = useState([]);
  const [dobbledamage, setDobbledamage] = useState([]);




  const [typesforpokemon, setTypesforpokemon] = useState([]);

  const [name, setName] = useState([]);
  const [types, setTypes] = useState([]);
  const [damage, setDamage] = useState([]);
  const [moves, setMoves] = useState([]);
  const [evolution, setEvolution] = useState([]);
  const [evolution2, setEvolution2] = useState([]);
  const [descripcion, setDescripcion] = useState([]);


  const [data, setData] = useState([]);


  let urlayuda = ""

  
  useEffect(() => {
    
    function getData(){
      axios
      .get(`${url}${id}`)
      .then((res) => {
        setData([res.data])
        setName(res.data);
        setTypes(res.data.types);
        setMoves(res.data.moves)
      })
    }
    function getDescription(){
      axios
      .get(`${urlDescripcion}${id}`)
      .then((res) => {
        setDescripcion(res.data.flavor_text_entries[42].flavor_text)
        urlayuda = res.data.evolution_chain.url


        getChain(urlayuda)
    

       
      })
    }

    function getAtack(){
      console.log()
      if(tipos.length == 2){
        console.log("son 2")
        axios
        .get(`${urlTipos}${tipos[0]}`)
        .then((res) => {
         
          
         
        })

        axios
        .get(`${urlTipos}${tipos[1]}`)
        .then((res2) => {
         
         
        })

      }
      else{
        axios
        .get(`${urlTipos}${tipos[0]}`)
        .then((res2) => {
       
          
         
        })
      }

    }

    function getChain(urlayuda){

      axios
      .get(urlayuda)
      .then((res) => {
        let cadena = []
        setEvolution([res.data])
        
        let lvl1 = res.data.chain.species.name
        cadena.push(lvl1)
        

        if(res.data.chain.evolves_to.length !==0){
          let lvl2 = res.data.chain.evolves_to[0].species.name
          console.log(lvl2)
          cadena.push(lvl2)
          
        }
        
        if(res.data.chain.evolves_to[0].evolves_to.length!==0){
          let lvl3 = res.data.chain.evolves_to[0].evolves_to[0].species.name
          cadena.push(lvl3)
          
        }
        setEvolution2(cadena)

        
        
       
      })
    }
  
    getData()
    getDescription()
    //getAtack()
    

  }, []);

  //Tipos de pokemon Lista

  let tipos = []
  tipos = types.map((types=> types.type.name))

 
      
      
    

 function ataque(tirpos){
      
  if(tipos.length == 2){
    axios
    .get(`${urlTipos}${tipos[0]}`)
    .then((res) => {

      setDamage([res.data.damage_relations])
      setNodamagefrom(res.data.damage_relations.no_damage_from)
      setNodamageto(res.data.damage_relations.no_damage_to)
      setDobbledamagefrom(res.data.damage_relations.double_damage_from)
      setDobbledamage(res.data.damage_relations.double_damage_to)
      setHalfdamagefrom(res.data.damage_relations.half_damage_from)
      setHalfdamageto(res.data.damage_relations.half_damage_to)
    
    })
    
    axios
    .get(`${urlTipos}${tipos[1]}`)
    .then((res2) => {
      
      
     
    })
    
    
    
    return(
      <>
      <div>Tipo:{tipos[0]}</div>
      <div>No le hace daño a:</div>
      <div>Le hace mitad de daño a:</div>
      <div>Le hace el doble de daño a:</div>
      <div>Recibe el doble de daño de: {
        
        dobbledamagefrom.map(damage=>{
          return(
            <>
              <span>{damage.name}, </span>
            </>
            
          )
          
        })
        }        
                
                    

      </div>
      <br></br>
      <div>Tipo:{tipos[1]}</div>
      <div>No le hace daño a:</div>
      <div>Le hace mitad de daño a:</div>
      <div>Le hace el doble de daño a:</div>
      <div>Recibe el doble de daño de:</div>
      </>
    )
    
  }
  else{
    return(
      <>

      <div>Tipo:{tipos[0]}</div>
      <div>No le hace daño a:</div>
      <div>Le hace mitad de daño a: </div>
      <div>Le hace el doble de daño a: </div>
      <div>Recibe el doble de daño de:          
      </div>
      </>
    )
    
  }
 }

  

 

  return <div>
              <h2>
                Pokemon Info
              </h2>
              <div>
                <b>
                  Nombre:
                </b>
                { JSON.stringify(name.name)}
              </div>

              

              
              <div>
              <b>
                Tipos: 
              </b>
              
              {
                types.map(types => {
                  return(
                    <span >  {types.type.name }, </span> 
                  )
                })
                

              }
              </div>
              <div>
                <b>descripcion</b>
              </div>
              {JSON.stringify(descripcion)}

              <div>
                <b>Tipos de daños</b>
              </div>
                {ataque(tipos)}

              <div>
                <b>Posibles Movimientos</b>
              </div>
            
              {
                moves.map(moves => {
                  return(
                    <span> {moves.move.name}, </span>
                  )
                })
                
              }


              <div>
                <b>Cadena Evolutiva</b>
              </div>
                    

              {
                evolution2.map(evolution2 => {
                  return(
                    <span >  {evolution2} {"=>"} </span> 
                  )
                })

              }
           
    
       
    
                           
          
              
 
                   

        </div>;
    

        
};
export default App;