var dir = require('node-dir');
var convert = require('xml-js');
var  XLSX = require('xlsx');
// display contents of files in this script's directory
var allFiles=[]
// match only filenames with a .txt extension and that don't start with a `.´
var result=[
    ["NENAME","VLANID","MASK","NEXTHOPIP","DEVIP"],

]

 dir.subdirs("/home/millat/Desktop/CfgData", function(err, subdirs) {
    if (err) throw err;

     for (var i in subdirs) {
         if (subdirs.hasOwnProperty(i)) {
             allFiles.push(subdirs[i])
         }
     }

     allFiles.map((file,i)=>{
    console.log(file)
         console.log(i)
    dir.readFiles(file, {
            match: /.xml$/,
            exclude: /^\./
        }, function(err, content, next) {
            if (err) throw err;
            // console.log('content:', content);
            // console.log("====================================================================================================================")

            var result1 = convert.xml2json(content, {compact: true, spaces: 4});
            var data = JSON.parse(result1);
            console.log(data);

            var name="";
            var ne1="",ne2="";
            var vi1,vi2;
            var mk1,mk2;
            var nh1,nh2;
            var v1,v2;
            var myarray1=[];
            var myarray2 = [];

            var backupcfg = data["spec:BACKUPCFG"];
            // console.log(data["spec:BACKUPCFG"])
            // console.log(backupcfg["spec:syndata"])
            var syndata = backupcfg["spec:syndata"];
            console.log(syndata);
            // syndata.map((attributes, i)=>{
            //     // console.log(attributes)
            //     console.log(attributes["class"]);
            //
            // })
            var attributes = syndata[0]
            var classsss = attributes["class"];
            console.log(classsss)
            classsss.map((item, i) => {
                // console.log(item)
                if (Object.keys(item) == "NE") {
                    // for (var i in item){
                    //     console.log(item[i])
                    // }

                    var nename = item["NE"].attributes["NENAME"];

                    console.log(nename);
                    myarray1.push(nename._text)
                    myarray2.push(nename._text)
                    ne1=nename._text
                    ne2=nename._text
                    name="masum"
                    console.log(ne1)

                }
                else if (Object.keys(item) == "VLANMAP") {

                    //for (var i in item) {
                    //console.log(item[i])
                    var vlanmap = item["VLANMAP"][0];
                    vlanId = vlanmap["attributes"].VLANID;
                    var mask = vlanmap["attributes"].MASK;
                    var nextHopIp = vlanmap["attributes"].NEXTHOPIP;
                    console.log("vlan id")
                    console.log(vlanId._text)
                    console.log(mask)
                    console.log(nextHopIp)
                    console.log("lasjdflasjflasjflkj")


                    // Object.assign(obj1,{
                    //     VLANID:vlanId._text,
                    //     MASK: vlanId._text,
                    //     NEXTHOPIP: nextHopIp._text,
                    // } );

                    myarray1.push(vlanId._text)
                    myarray1.push(mask._text)
                    myarray1.push(nextHopIp._text)

                    vi1=vlanId._text;
                    mk1 = mask._text;
                    nh1 = nextHopIp._text;

                    console.log(vi1,mk1,nh1)


                    var vlanmap = item["VLANMAP"][1];
                    var vlanId = vlanmap["attributes"].VLANID;
                    var mask = vlanmap["attributes"].MASK;
                    var nextHopIp = vlanmap["attributes"].NEXTHOPIP;
                    console.log("vlan id")
                    console.log(vlanId)
                    console.log(mask)
                    console.log(nextHopIp)

                    // myarray2.push(vlanId._text)
                    // myarray2.push(mask._text)
                    // myarray2.push(nextHopIp._text)

                    vi2=vlanId._text;
                    mk2 = mask._text;
                    nh2 = nextHopIp._text;



                    //}
                    // var vlanmap = item["VLANMAP"][0];
                    // console.log(vlanmap)
                    // // for (var i in vlanmap){
                    // //     console.log(vlanmap["attributes"].VLANID)
                    // //
                    // // }

                } else if (Object.keys(item) == "DEVIP") {
                    // for (var i in item){
                    //     console.log(item[i])
                    // }
                    // console.log(item["DEVIP"].attributes["IP"]);
                    var devIp = item["DEVIP"][0]
                    var ip = devIp["attributes"].IP
                    console.log(ip)
                    // myarray1.push(ip._text)
                    v1=ip._text;



                    var devIp = item["DEVIP"][1]
                    var ip = devIp["attributes"].IP
                    console.log(ip)
                    // myarray2.push(ip._text)
                    v2=ip._text;

                }


            })



            console.log(ne1,vi1,)
            var arrayvar = result
            arrayvar.push([ne1, vi1,mk1,nh1,v1])
            result=arrayvar

            var arrayvar = result
            arrayvar.push([ne2,vi2,mk2,nh2,v2])
            result=arrayvar

            console.log(result)


            const ws = XLSX.utils.aoa_to_sheet(result);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
            /* generate XLSX file and send to client */
            XLSX.writeFile(wb, "sheetjs.xlsx")





            next();
        },
        function(err, files){
            if (err) throw err;
            console.log('finished reading files:',files);
        });
})


 });





