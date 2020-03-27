var data = [
    {rank:"1",
     handleName:"Drkmaster",
     Contribution:"113" ,
     Year:"SE"  
    },
    {rank:"2",
     handleName:"Someone",
     Contribution:"325",
     Year:"TE"
    },
    {rank:"3",
    handleName:"Someone",
    Contribution:"325",
    Year:"SE"
   },
   {rank:"4",
   handleName:"Someone",
   Contribution:"325",
   Year:"FE"
  },
  {rank:"5",
  handleName:"Someone",
  Contribution:"325",
  Year:"FE"
 },
 {rank:"6",
 handleName:"Someone",
 Contribution:"325",
 Year:"SE"
}

];

function all(data){
var tblbdy = document.getElementById("tbdy");
 for(var index in data)
 {
    var tblrw = document.createElement('tr');
     for(var info in data[index] )
     {
        var tbltd = document.createElement('td');
        var tbldata = document.createTextNode(data[index][info]);
        console.log(data[0][info]);
        tbltd.appendChild(tbldata);
        tblrw.appendChild(tbltd);
     }
    // if( data[index]["Year"]=="SE")
     tblbdy.appendChild(tblrw);
 }   

}

function fes(data){
   var tblbdy = document.getElementById("tbdy");
    for(var index in data)
    {
       var tblrw = document.createElement('tr');
        for(var info in data[index] )
        {
           var tbltd = document.createElement('td');
           var tbldata = document.createTextNode(data[index][info]);
           console.log(data[0][info]);
           tbltd.appendChild(tbldata);
           tblrw.appendChild(tbltd);
        }
        if( data[index]["Year"]=="FE")
        tblbdy.appendChild(tblrw);
    }   
   
   }
   function ses(data){
      var tblbdy = document.getElementById("tbdy");
       for(var index in data)
       {
          var tblrw = document.createElement('tr');
           for(var info in data[index] )
           {
              var tbltd = document.createElement('td');
              var tbldata = document.createTextNode(data[index][info]);
              console.log(data[0][info]);
              tbltd.appendChild(tbldata);
              tblrw.appendChild(tbltd);
           }
          if( data[index]["Year"]=="SE")
           tblbdy.appendChild(tblrw);
       }   
      
      }
      function tes(data){
         var tblbdy = document.getElementById("tbdy");
          for(var index in data)
          {
             var tblrw = document.createElement('tr');
              for(var info in data[index] )
              {
                 var tbltd = document.createElement('td');
                 var tbldata = document.createTextNode(data[index][info]);
                 console.log(data[0][info]);
                 tbltd.appendChild(tbldata);
                 tblrw.appendChild(tbltd);
              }
             if( data[index]["Year"]=="TE")
              tblbdy.appendChild(tblrw);
          }   
         
         }
        
function al()
{
   
   all(data);
}
function fe()
{

   fes(data);
}
function se()
{
   
   ses(data);
}
function te()
{
   
   tes(data);
}