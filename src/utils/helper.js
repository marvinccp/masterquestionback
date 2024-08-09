export const data = async () =>{
    try {
        const info = await fetch("http://localhost:3001/game/Questions");
        const infoData = await info.json();
        console.log(infoData);
    } catch (error) {
     console.error(error);     
    }    
}
data()