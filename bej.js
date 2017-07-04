// title:  bejeweled
// author: @jose_pedro_dias
// desc:   short description
// script: js
// input:  mouse

var W=16
var X=51
var Y=6
var wasDown=0
var x0,x1,y0,y1
var score=0

function rnd(n){
 return ~~(Math.random()*n)
}

function pair(a){
 return [a[0],a[1]]
}

function init(){
	var x,y,i
	for(y=0;y<8;++y){
	 for(x=0;x<8;++x){
		 mset(x,y,rnd(7)+1)
		}
	}
	processAll()
	score=0
	draw()
}

function process(p){
 if(!isValid(p))return
	var c=mget(p[0],p[1])
	if(!c)return
 var a=[p]
	var xs=[]
	var ys=[]
	var dirs=[[0,1],[0,-1],[1,0],[-1,0]]
	var d,dir,bag
	for(d=0;d<4;++d){
	 dir=dirs[d]
	 p1=pair(p)
		while(1){
		 p1[0]+=dir[0]
			p1[1]+=dir[1]
			if(!isValid(p1))break
			if(mget(p1[0],p1[1])!==c)break
			bag=(p1[0]?xs:ys)
			bag.push(pair(p1))
		}
	}
	if(xs.length>1){a=a.concat(xs)}
	if(ys.length>1){a=a.concat(ys)}
	if(a.length===1)return
	a.forEach(function(p){
	 mset(p[0],p[1],0)
		++score
	})
	return true
}

function processAll(){
 var x,y,found=false
	for(x=0;x<8;++x){
	 for(y=7;y>-1;--y){
			found|=process([x,y])
		}
	}
	if(found){
	 drop()
		processAll()
		return true
	}
}

function getUp(x,y,y0){
 if(y<0)return rnd(7)+1
 var c=mget(x,y)
	if(c){
	 if(y!==y0)mset(x,y,0)
	 return c
	}
	return getUp(x,y-1,y0)
}

function drop(){
 var x,y,c
	for(x=0;x<8;++x){
	 for(y=7;y>-1;--y){
			mset(x,y,getUp(x,y,y))
		}
	}
}

function draw(){
 cls(0)
	map(0,0,8,8,X,Y,-1,2)
	print(score,0,0)
}

function isValid(p){
	if(p[0]<0||p[0]>7)return
	if(p[1]<0||p[1]>7)return
 return p
}

function pix2map(x,y){
 var p=[
  Math.floor((x-X)/W),
	 Math.floor((y-Y)/W)
	]
	return isValid(p)
}

function sign(n){
 return (n<0?-1:(n>0?1:0))
}

init()

function TIC(){
 var m=mouse()
	if(m){
	 if(!wasDown&&m[2]){
		 x0=m[0]
			y0=m[1]
			wasDown=1
		}else if(wasDown&&!m[2]){
		 x1=m[0]
			y1=m[1]
		 wasDown=0
   
			var a=pix2map(x0,y0)
			var isAxisX=Math.abs(x1-x0)>Math.abs(y1-y0)
			var b=pair(a)
			if(isAxisX) b[0]+=sign(x1-x0)
			else        b[1]+=sign(y1-y0)
			if(!isValid(b))return
			
			var t=mget(a[0],a[1])
			var u=mget(b[0],b[1])
			mset(b[0],b[1],t)
			mset(a[0],a[1],u)
			
			if(processAll()){
				draw()
			}else{
			 mset(b[0],b[1],t)
		 	mset(a[0],a[1],u) 
			}
		}
	}	
}
