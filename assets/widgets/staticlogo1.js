var shift_hor=0;
var shift_vert=0;
if (placement==1 || placement==2) shift_vert=1;
if (placement==4 || placement==1) shift_hor=1;
function regenerate(){
	window.location.reload()
}
function regenerate2(){
	if (document.layers)
	setTimeout("window.onresize=regenerate",400)
}

if (document.all){
	document.write('<div id="logo" style="filter:alpha(opacity=0);position:absolute;top:100;width:'+staticlogo.width+';height:'+staticlogo.height+'"></div>')
} else	if (document.getElementById){
	document.write('<div id="logo" style="-Moz-opacity:0;position:absolute;top:100;width:'+staticlogo.width+';height:'+staticlogo.height+'"></div>')
	}

function bringintoview(){
	if (document.all) {
		if (logo.filters.alpha.opacity<=95)
			logo.filters.alpha.opacity+=5
		else{
			clearInterval(viewit)
			if (visibleduration!=0)
				setTimeout("logo.style.visibility='hidden'",visibleduration*1000)
		}

	}
	else if (document.getElementById) { 
		if (document.getElementById("logo").style.MozOpacity<=0.95) 
			document.getElementById("logo").style.MozOpacity=Number (document.getElementById("logo").style.MozOpacity) + 0.05;
		else{
			clearInterval(viewit)
			if (visibleduration!=0)
				setTimeout("document.getElementById('logo').style.visibility='hidden'",visibleduration*1000)
		}
	}
}


function createlogo(){
	staticimage=new Layer(100)
	staticimage.left=-300
	staticimage.top=120
	staticimage.document.write('<a href="'+logolink+'"><img src="'+staticlogo.src+'" border=0 alt="'+alttext+'"></a>')
	staticimage.document.close()
	staticimage.visibility="show"
	regenerate2()
	staticitns()
}

if (document.layers)
	window.onload=createlogo;

if (document.all){
	w=(shift_hor ? document.body.clientWidth-logo.style.pixelWidth-dist_vert : dist_vert)
	h=(shift_vert ? document.body.clientHeight-logo.style.pixelHeight-dist_hor : dist_hor)  
	logo.style.left=w
	logo.style.top=h
}
else if (document.getElementById) {
	w=(shift_hor ? document.body.clientWidth-staticlogo.width-dist_vert : dist_vert)
	h=(shift_vert ? document.body.clientHeight-staticlogo.height-dist_hor : dist_hor)  
	document.getElementById("logo").style.left=w
	document.getElementById("logo").style.top=h
}

function logoit(){
	if (document.all) {
		var w2=document.body.scrollLeft+w
		var h2=document.body.scrollTop+h
		logo.style.left=w2
		logo.style.top=h2
	}
	else if (document.getElementById){
		var w2=document.body.scrollLeft+w
		var h2=document.body.scrollTop +h
		document.getElementById("logo").style.left=w2
		document.getElementById("logo").style.top=h2
	}
}
function logoit2(){
	staticimage.left=pageXOffset+(shift_hor ? window.innerWidth-staticimage.document.width-15 : 2)
	staticimage.top=pageYOffset+(shift_vert ? window.innerHeight-staticimage.document.height : 2) 
}

function insertimage(){
	if (!document.all)
		document.getElementById("logo").innerHTML='<a href="'+logolink+'"><img src="'+staticlogo.src+'" border=0 alt="'+alttext+'"></a>'
	else 	
		logo.innerHTML='<a href="'+logolink+'"><img src="'+staticlogo.src+'" border=0 alt="'+alttext+'"></a>'
	if (fadeintoview) {
		viewit=setInterval("bringintoview()",fade_dur*50) }
	else {
		if (visibleduration!=0)
		setTimeout("logo.style.visibility='hidden'",visibleduration*1000)
	}
}

if (document.all||document.getElementById){
	document.onscroll=logoit
	window.onscroll=logoit
	window.onresize=new Function("window.location.reload()")
	window.onload=insertimage
}



function staticitns(){
	setInterval("logoit2()",90)
	if (visibleduration!=0)
		setTimeout("staticimage.visibility='hide'",visibleduration*1000)
}
