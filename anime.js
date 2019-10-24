//https://github.com/YoannCHB/Break - version 2.1 - Yoann Charbonnier - Break.js
//Api source : https://kitsu.io
//Api example: https://kitsu.io/api/edge/anime?filter[text]=konosuba
const auto_url=function(u){try{let url=new window.URL(u);let s=Boolean(url);return s}
catch(e){return!1}}
var auto_ext=["sncf","org","com","us","fr","xyz","sony","sexy","eus","gift","info","st","int","net","pro","post","wiki","onl","cat"];class BreakRequest{constructor(url){this.type=null;this.method='GET';this.request=!1;this.url=url;this.loop=!0;this.connected=!1;this.error=!1;this.proto1=new XMLHttpRequest();this.proto2=null;this.proto3=null;this.json=null;this.response=null;this.correctURL=!1;this.f={};this.headers=[];this.responseType=!1;this.headerMap=[];this.send=null}}
BreakRequest.prototype.ext=function(e){auto_ext.push(e)}
BreakRequest.prototype.writeHead=function(h,v){this.headers.push(new Array(h,v))}
BreakRequest.prototype.listen=function(p){let cache=this.url.split('/');let verif=!1;let final="";for(var n in cache){if(cache[n].indexOf('.')!=-1&&!verif){if(cache[n].indexOf(':')!=-1){console.error('Port already open !');final+=cache[n]+"/";verif=!0}else{final+=cache[n]+":"+p+"/";verif=!0}}else{final+=cache[n]+"/"}}
this.url=final;console.warn("Port open on: "+this.url)}
const auto_proto3=function(el,url){if(el.f.error){el.f.error()}
el.error=!0;el.send=!1}
const auto_evsource=function(el,url){try{if(el.headers.length>0){var h={};for(var i=0;i<el.headers.length;i++){h[el.headers[i][0]]=el.headers[i][1]}}
if(h){el.proto3=new window.EventSource(url,h)}else{el.proto3=new window.EventSource(url)}
el.proto3.onerror=function(e){auto_proto2(el,url)}
el.proto3.onopen=function(){el.type=['EventSource']
el.request=el.proto3;el.connected=!0;el.response=!1;el.json=!1;el.correctURL=url;if(el.f.open){el.f.open(el.proto3)}}
el.proto3.onmessage=function(e){if(el.f.message){el.f.message(e)}}
el.proto3.onclose=function(e){if(el.f.close){el.f.close(e)}
el.send=!1;console.warn('Server closed')}}
catch(e){auto_proto2(el,url)}}
const auto_proto2=function(el,url){let test=url.indexOf('http');if(test==-1){try{el.proto2=new WebSocket(url)}
catch(e){auto_proto3(el,url);return''}}else{url=url.replace('https',"wss")!=url?url.replace('https',"wss"):url.replace('http','ws');try{el.proto2=new WebSocket(url)}
catch(e){auto_proto3(el,url);return""}}
el.proto2.onerror=function(e){el.send=!1;auto_proto3(el,url)}
el.proto2.onopen=function(){el.type=['WebSocket']
el.request=el.proto2;el.connected=!0;el.response=!1;el.json=!1;el.correctURL=url;el.send=function(text){this.proto2.send(text)}
if(el.f.open){el.f.open(el.proto2)}}
el.proto2.onmessage=function(e){if(el.f.message){el.f.message(e)}}
el.proto2.onclose=function(e){if(el.f.close){el.f.close(e)}
el.send=!1;console.warn('Server closed')}}
const auto_verif=function(url){if(url.indexOf('http')+url.indexOf('ws')==-2){return"https://"}else{return!1}
if(url.indexOf('.')){let s=url.split('.');let g=s[s.length-1];for(var i=0;i<auto_ext.length;i++){if(g==auto_ext[i]){return"https://"}}}
if(url.indexOf('/')==-1){return"/"}
return!1}
BreakRequest.prototype.connect=function(url){let element=this;url=url||this.url;let save=url;let complement=auto_verif(url);if(complement){url=complement+url}
if(!auto_url(url)){url=document.location.href+url;if(!auto_url(url)){console.error('INVALID URL: '+element.url);return!1}}
this.proto1.open(this.method,url,this.loop);for(var i=0;i<this.headers.length;i++){this.proto1.setRequestHeader(this.headers[i][0],this.headers[i][1])}
if(this.responseType){this.proto1.responseType=this.responseType}
this.proto1.onerror=function(e){element.send=!1;auto_evsource(element,url)}
this.proto1.onload=function(){let headers=element.proto1.getAllResponseHeaders();let arr=headers.trim().split(/[\r\n]+/);arr.forEach(function(line){var parts=line.split(': ');var header=parts.shift();var value=parts.join(': ');element.headerMap[header]=value});element.request=element.proto1;element.type=["XMLHttpRequest",'GET',element.responseType];element.connected=!0;element.correctURL=url;element.response=element.proto1.response;element.send=function(text){let req=new XMLHttpRequest();req.open('POST',this.url);req.onerror=function(e){console.warn(e)}
req.send(text)}
try{var jsonGet=JSON.parse(element.proto1.response)}
catch(e){var jsonGet=!1}
if(jsonGet){element.json=jsonGet}
if(element.f.open){element.f.open(element.proto1.response)}else{}}
this.proto1.send()}
BreakRequest.prototype.on=function(p,call){try{p=p.toLowerCase()}
catch(e){p=p}
switch(p){case "message":this.f.message=call;break;case "open":this.f.open=call;break;case "close":this.f.close=call;break;case "error":this.f.error=call;break;default:console.error('Invalide parameter: '+p)}}

function animeAPI(name, backcall){
    let api = new BreakRequest('https://kitsu.io/api/edge/anime?filter[text]='+encodeURIComponent(name));
    api.on('open', function(res){
        res=api.json;
        let anime_name=[];
        let anime_synopsis=[];
        let createdAt=[];
        let updatedAt=[];
        let endDate=[];
        let nextRelease=[];
        let anime_type=[];
        let anime_status=[];
        let anime_pop=[];
        let anime_age=[];
        let anime_subtype=[];
        let posterImage=[];
        let coverImage=[];
        let anime_nsfw=[]
        let anime_ep={
            episodeCount: 0,
            episodeLength: 0,
            totalLength: 0
        }
        let anime_youtube=[];
        let cache='';
        let anime_genre=[];
        for(n in res.data){
            let actu=res.data[n];
            //anime_name
            anime_name.push(actu.attributes.titles);
            anime_name.push(actu.attributes.abbreviatedTitles);
            //anime_synopsis
            anime_synopsis.push(actu.attributes.synopsis)
            //createdAt
            createdAt.push(actu.attributes.startDate);
            //updatedAt
            updatedAt.push(actu.attributes.updatedAt.split('T')[0])
            //endDate
            endDate.push(actu.attributes.endDate)
            //nextRelease
            nextRelease.push(actu.attributes.nextRelease)
            //anime_type
            anime_type.push(actu.type);
            //anime_status
            anime_status.push(actu.attributes.status);
            //anime_pop
            anime_pop.push(actu.attributes.popularityRank);
            anime_pop.push(actu.attributes.ratingRank);
            //anime_age
            anime_age.push(actu.attributes.ageRating);
            anime_age.push(actu.attributes.ageRatingGuide);
            //anime_subtype
            anime_subtype.push(actu.attributes.subtype);
            //posterImage
            posterImage.push(actu.attributes.posterImage);
            //coverImage
            coverImage.push(actu.attributes.coverImage);
            //anime_nsfw
            anime_nsfw.push(actu.attributes.nsfw);
            //anime_ep
            anime_ep.episodeCount=actu.attributes.episodeCount;
            anime_ep.episodeLength=actu.attributes.episodeLength;
            anime_ep.totalLength=actu.attributes.totalLength;
            //anime_youtube
            anime_youtube.push(actu.attributes.youtubeVideoId);
            //cache
            cache=actu.relationships.genres.links.related;
        }
        let req=new BreakRequest(cache);
        req.on('open', function(res){
            for(var i=0; i<req.json.data.length; i++){
                anime_genre.push(req.json.data[i].attributes.name)
            }
            let animeAPIResult={
                anime_genre: anime_genre,
                anime_name: anime_name,
                anime_synopsis: anime_synopsis,
                createdAt: createdAt,
                updatedAt: updatedAt,
                endDate: endDate,
                nextRelease: nextRelease,
                anime_type: anime_type,
                anime_status: anime_status,
                anime_pop: anime_pop,
                anime_age: anime_age,
                anime_subtype: anime_subtype,
                posterImage: posterImage,
                coverImage: coverImage,
                anime_nsfw: anime_nsfw,
                anime_ep: anime_ep,
                anime_youtube: anime_youtube
            }
            backcall(animeAPIResult);
        })
        req.connect();
    })
    api.connect();
}
/*Example for konosuba anime
animeAPI('konosuba', function(res){
    console.log(res);
});
*/