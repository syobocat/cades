var qrcode=function(){"use strict";function G(d){return d&&d.__esModule&&Object.prototype.hasOwnProperty.call(d,"default")?d.default:d}function U(d){if(d.__esModule)return d;var A=d.default;if(typeof A=="function"){var p=function g(){return this instanceof g?Reflect.construct(A,arguments,this.constructor):A.apply(this,arguments)};p.prototype=A.prototype}else p={};return Object.defineProperty(p,"__esModule",{value:!0}),Object.keys(d).forEach(function(g){var T=Object.getOwnPropertyDescriptor(d,g);Object.defineProperty(p,g,T.get?T:{enumerable:!0,get:function(){return d[g]}})}),p}var Q={exports:{}};const K=U(Object.freeze(Object.defineProperty({__proto__:null,default:{}},Symbol.toStringTag,{value:"Module"})));(function(d){function A(e){this.mode=g.MODE_8BIT_BYTE,this.data=e,this.parsedData=[];for(var t=0,i=this.data.length;t<i;t++){var r=[],n=this.data.charCodeAt(t);n>65536?(r[0]=240|(n&1835008)>>>18,r[1]=128|(n&258048)>>>12,r[2]=128|(n&4032)>>>6,r[3]=128|n&63):n>2048?(r[0]=224|(n&61440)>>>12,r[1]=128|(n&4032)>>>6,r[2]=128|n&63):n>128?(r[0]=192|(n&1984)>>>6,r[1]=128|n&63):r[0]=n,this.parsedData.push(r)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}A.prototype={getLength:function(e){return this.parsedData.length},write:function(e){for(var t=0,i=this.parsedData.length;t<i;t++)e.put(this.parsedData[t],8)}};function p(e,t){this.typeNumber=e,this.errorCorrectLevel=t,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}p.prototype={addData:function(e){var t=new A(e);this.dataList.push(t),this.dataCache=null},isDark:function(e,t){if(e<0||this.moduleCount<=e||t<0||this.moduleCount<=t)throw new Error(e+","+t);return this.modules[e][t]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(e,t){this.moduleCount=this.typeNumber*4+17,this.modules=new Array(this.moduleCount);for(var i=0;i<this.moduleCount;i++){this.modules[i]=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++)this.modules[i][r]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(e,t),this.typeNumber>=7&&this.setupTypeNumber(e),this.dataCache==null&&(this.dataCache=p.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,t)},setupPositionProbePattern:function(e,t){for(var i=-1;i<=7;i++)if(!(e+i<=-1||this.moduleCount<=e+i))for(var r=-1;r<=7;r++)t+r<=-1||this.moduleCount<=t+r||(0<=i&&i<=6&&(r==0||r==6)||0<=r&&r<=6&&(i==0||i==6)||2<=i&&i<=4&&2<=r&&r<=4?this.modules[e+i][t+r]=!0:this.modules[e+i][t+r]=!1)},getBestMaskPattern:function(){for(var e=0,t=0,i=0;i<8;i++){this.makeImpl(!0,i);var r=l.getLostPoint(this);(i==0||e>r)&&(e=r,t=i)}return t},createMovieClip:function(e,t,i){var r=e.createEmptyMovieClip(t,i),n=1;this.make();for(var a=0;a<this.modules.length;a++)for(var s=a*n,o=0;o<this.modules[a].length;o++){var u=o*n,f=this.modules[a][o];f&&(r.beginFill(0,100),r.moveTo(u,s),r.lineTo(u+n,s),r.lineTo(u+n,s+n),r.lineTo(u,s+n),r.endFill())}return r},setupTimingPattern:function(){for(var e=8;e<this.moduleCount-8;e++)this.modules[e][6]==null&&(this.modules[e][6]=e%2==0);for(var t=8;t<this.moduleCount-8;t++)this.modules[6][t]==null&&(this.modules[6][t]=t%2==0)},setupPositionAdjustPattern:function(){for(var e=l.getPatternPosition(this.typeNumber),t=0;t<e.length;t++)for(var i=0;i<e.length;i++){var r=e[t],n=e[i];if(this.modules[r][n]==null)for(var a=-2;a<=2;a++)for(var s=-2;s<=2;s++)a==-2||a==2||s==-2||s==2||a==0&&s==0?this.modules[r+a][n+s]=!0:this.modules[r+a][n+s]=!1}},setupTypeNumber:function(e){for(var t=l.getBCHTypeNumber(this.typeNumber),i=0;i<18;i++){var r=!e&&(t>>i&1)==1;this.modules[Math.floor(i/3)][i%3+this.moduleCount-8-3]=r}for(var i=0;i<18;i++){var r=!e&&(t>>i&1)==1;this.modules[i%3+this.moduleCount-8-3][Math.floor(i/3)]=r}},setupTypeInfo:function(e,t){for(var i=this.errorCorrectLevel<<3|t,r=l.getBCHTypeInfo(i),n=0;n<15;n++){var a=!e&&(r>>n&1)==1;n<6?this.modules[n][8]=a:n<8?this.modules[n+1][8]=a:this.modules[this.moduleCount-15+n][8]=a}for(var n=0;n<15;n++){var a=!e&&(r>>n&1)==1;n<8?this.modules[8][this.moduleCount-n-1]=a:n<9?this.modules[8][15-n-1+1]=a:this.modules[8][15-n-1]=a}this.modules[this.moduleCount-8][8]=!e},mapData:function(e,t){for(var i=-1,r=this.moduleCount-1,n=7,a=0,s=this.moduleCount-1;s>0;s-=2)for(s==6&&s--;;){for(var o=0;o<2;o++)if(this.modules[r][s-o]==null){var u=!1;a<e.length&&(u=(e[a]>>>n&1)==1);var f=l.getMask(t,r,s-o);f&&(u=!u),this.modules[r][s-o]=u,n--,n==-1&&(a++,n=7)}if(r+=i,r<0||this.moduleCount<=r){r-=i,i=-i;break}}}},p.PAD0=236,p.PAD1=17,p.createData=function(e,t,i){for(var r=B.getRSBlocks(e,t),n=new S,a=0;a<i.length;a++){var s=i[a];n.put(s.mode,4),n.put(s.getLength(),l.getLengthInBits(s.mode,e)),s.write(n)}for(var o=0,a=0;a<r.length;a++)o+=r[a].dataCount;if(n.getLengthInBits()>o*8)throw new Error("code length overflow. ("+n.getLengthInBits()+">"+o*8+")");for(n.getLengthInBits()+4<=o*8&&n.put(0,4);n.getLengthInBits()%8!=0;)n.putBit(!1);for(;!(n.getLengthInBits()>=o*8||(n.put(p.PAD0,8),n.getLengthInBits()>=o*8));)n.put(p.PAD1,8);return p.createBytes(n,r)},p.createBytes=function(e,t){for(var i=0,r=0,n=0,a=new Array(t.length),s=new Array(t.length),o=0;o<t.length;o++){var u=t[o].dataCount,f=t[o].totalCount-u;r=Math.max(r,u),n=Math.max(n,f),a[o]=new Array(u);for(var h=0;h<a[o].length;h++)a[o][h]=255&e.buffer[h+i];i+=u;var w=l.getErrorCorrectPolynomial(f),L=new x(a[o],w.getLength()-1),M=L.mod(w);s[o]=new Array(w.getLength()-1);for(var h=0;h<s[o].length;h++){var N=h+M.getLength()-s[o].length;s[o][h]=N>=0?M.get(N):0}}for(var m=0,h=0;h<t.length;h++)m+=t[h].totalCount;for(var b=new Array(m),P=0,h=0;h<r;h++)for(var o=0;o<t.length;o++)h<a[o].length&&(b[P++]=a[o][h]);for(var h=0;h<n;h++)for(var o=0;o<t.length;o++)h<s[o].length&&(b[P++]=s[o][h]);return b};for(var g={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},T={L:1,M:0,Q:3,H:2},C={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},l={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(e){for(var t=e<<10;l.getBCHDigit(t)-l.getBCHDigit(l.G15)>=0;)t^=l.G15<<l.getBCHDigit(t)-l.getBCHDigit(l.G15);return(e<<10|t)^l.G15_MASK},getBCHTypeNumber:function(e){for(var t=e<<12;l.getBCHDigit(t)-l.getBCHDigit(l.G18)>=0;)t^=l.G18<<l.getBCHDigit(t)-l.getBCHDigit(l.G18);return e<<12|t},getBCHDigit:function(e){for(var t=0;e!=0;)t++,e>>>=1;return t},getPatternPosition:function(e){return l.PATTERN_POSITION_TABLE[e-1]},getMask:function(e,t,i){switch(e){case C.PATTERN000:return(t+i)%2==0;case C.PATTERN001:return t%2==0;case C.PATTERN010:return i%3==0;case C.PATTERN011:return(t+i)%3==0;case C.PATTERN100:return(Math.floor(t/2)+Math.floor(i/3))%2==0;case C.PATTERN101:return t*i%2+t*i%3==0;case C.PATTERN110:return(t*i%2+t*i%3)%2==0;case C.PATTERN111:return(t*i%3+(t+i)%2)%2==0;default:throw new Error("bad maskPattern:"+e)}},getErrorCorrectPolynomial:function(e){for(var t=new x([1],0),i=0;i<e;i++)t=t.multiply(new x([1,v.gexp(i)],0));return t},getLengthInBits:function(e,t){if(1<=t&&t<10)switch(e){case g.MODE_NUMBER:return 10;case g.MODE_ALPHA_NUM:return 9;case g.MODE_8BIT_BYTE:return 8;case g.MODE_KANJI:return 8;default:throw new Error("mode:"+e)}else if(t<27)switch(e){case g.MODE_NUMBER:return 12;case g.MODE_ALPHA_NUM:return 11;case g.MODE_8BIT_BYTE:return 16;case g.MODE_KANJI:return 10;default:throw new Error("mode:"+e)}else if(t<41)switch(e){case g.MODE_NUMBER:return 14;case g.MODE_ALPHA_NUM:return 13;case g.MODE_8BIT_BYTE:return 16;case g.MODE_KANJI:return 12;default:throw new Error("mode:"+e)}else throw new Error("type:"+t)},getLostPoint:function(e){for(var t=e.getModuleCount(),i=0,r=0;r<t;r++)for(var n=0;n<t;n++){for(var a=0,s=e.isDark(r,n),o=-1;o<=1;o++)if(!(r+o<0||t<=r+o))for(var u=-1;u<=1;u++)n+u<0||t<=n+u||o==0&&u==0||s==e.isDark(r+o,n+u)&&a++;a>5&&(i+=3+a-5)}for(var r=0;r<t-1;r++)for(var n=0;n<t-1;n++){var f=0;e.isDark(r,n)&&f++,e.isDark(r+1,n)&&f++,e.isDark(r,n+1)&&f++,e.isDark(r+1,n+1)&&f++,(f==0||f==4)&&(i+=3)}for(var r=0;r<t;r++)for(var n=0;n<t-6;n++)e.isDark(r,n)&&!e.isDark(r,n+1)&&e.isDark(r,n+2)&&e.isDark(r,n+3)&&e.isDark(r,n+4)&&!e.isDark(r,n+5)&&e.isDark(r,n+6)&&(i+=40);for(var n=0;n<t;n++)for(var r=0;r<t-6;r++)e.isDark(r,n)&&!e.isDark(r+1,n)&&e.isDark(r+2,n)&&e.isDark(r+3,n)&&e.isDark(r+4,n)&&!e.isDark(r+5,n)&&e.isDark(r+6,n)&&(i+=40);for(var h=0,n=0;n<t;n++)for(var r=0;r<t;r++)e.isDark(r,n)&&h++;var w=Math.abs(100*h/t/t-50)/5;return i+=w*10,i}},v={glog:function(e){if(e<1)throw new Error("glog("+e+")");return v.LOG_TABLE[e]},gexp:function(e){for(;e<0;)e+=255;for(;e>=256;)e-=255;return v.EXP_TABLE[e]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},c=0;c<8;c++)v.EXP_TABLE[c]=1<<c;for(var c=8;c<256;c++)v.EXP_TABLE[c]=v.EXP_TABLE[c-4]^v.EXP_TABLE[c-5]^v.EXP_TABLE[c-6]^v.EXP_TABLE[c-8];for(var c=0;c<255;c++)v.LOG_TABLE[v.EXP_TABLE[c]]=c;function x(e,t){if(e.length==null)throw new Error(e.length+"/"+t);for(var i=0;i<e.length&&e[i]==0;)i++;this.num=new Array(e.length-i+t);for(var r=0;r<e.length-i;r++)this.num[r]=e[r+i]}x.prototype={get:function(e){return this.num[e]},getLength:function(){return this.num.length},multiply:function(e){for(var t=new Array(this.getLength()+e.getLength()-1),i=0;i<this.getLength();i++)for(var r=0;r<e.getLength();r++)t[i+r]^=v.gexp(v.glog(this.get(i))+v.glog(e.get(r)));return new x(t,0)},mod:function(e){if(this.getLength()-e.getLength()<0)return this;for(var t=v.glog(this.get(0))-v.glog(e.get(0)),i=new Array(this.getLength()),r=0;r<this.getLength();r++)i[r]=this.get(r);for(var r=0;r<e.getLength();r++)i[r]^=v.gexp(v.glog(e.get(r))+t);return new x(i,0).mod(e)}};function B(e,t){this.totalCount=e,this.dataCount=t}B.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],B.getRSBlocks=function(e,t){var i=B.getRsBlockTable(e,t);if(i==null)throw new Error("bad rs block @ typeNumber:"+e+"/errorCorrectLevel:"+t);for(var r=i.length/3,n=[],a=0;a<r;a++)for(var s=i[a*3+0],o=i[a*3+1],u=i[a*3+2],f=0;f<s;f++)n.push(new B(o,u));return n},B.getRsBlockTable=function(e,t){switch(t){case T.L:return B.RS_BLOCK_TABLE[(e-1)*4+0];case T.M:return B.RS_BLOCK_TABLE[(e-1)*4+1];case T.Q:return B.RS_BLOCK_TABLE[(e-1)*4+2];case T.H:return B.RS_BLOCK_TABLE[(e-1)*4+3];default:return}};function S(){this.buffer=[],this.length=0}S.prototype={get:function(e){var t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)==1},put:function(e,t){for(var i=0;i<t;i++)this.putBit((e>>>t-i-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){var t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}};var I=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];function H(e){if(this.options={padding:4,width:256,height:256,typeNumber:4,color:"#000000",background:"#ffffff",ecl:"M"},typeof e=="string"&&(e={content:e}),e)for(var t in e)this.options[t]=e[t];if(typeof this.options.content!="string")throw new Error("Expected 'content' as string!");if(this.options.content.length===0)throw new Error("Expected 'content' to be non-empty!");if(!(this.options.padding>=0))throw new Error("Expected 'padding' value to be non-negative!");if(!(this.options.width>0)||!(this.options.height>0))throw new Error("Expected 'width' or 'height' value to be higher than zero!");function i(u){switch(u){case"L":return T.L;case"M":return T.M;case"Q":return T.Q;case"H":return T.H;default:throw new Error("Unknwon error correction level: "+u)}}function r(u,f){for(var h=n(u),w=1,L=0,M=0,N=I.length;M<=N;M++){var m=I[M];if(!m)throw new Error("Content too long: expected "+L+" but got "+h);switch(f){case"L":L=m[0];break;case"M":L=m[1];break;case"Q":L=m[2];break;case"H":L=m[3];break;default:throw new Error("Unknwon error correction level: "+f)}if(h<=L)break;w++}if(w>I.length)throw new Error("Content too long");return w}function n(u){var f=encodeURI(u).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return f.length+(f.length!=u?3:0)}var a=this.options.content,s=r(a,this.options.ecl),o=i(this.options.ecl);this.qrcode=new p(s,o),this.qrcode.addData(a),this.qrcode.make()}H.prototype.svg=function(e){var t=this.options||{},i=this.qrcode.modules;typeof e>"u"&&(e={container:t.container||"svg"});for(var r=typeof t.pretty<"u"?!!t.pretty:!0,n=r?"  ":"",a=r?`\r
`:"",s=t.width,o=t.height,u=i.length,f=s/(u+2*t.padding),h=o/(u+2*t.padding),w=typeof t.join<"u"?!!t.join:!1,L=typeof t.swap<"u"?!!t.swap:!1,M=typeof t.xmlDeclaration<"u"?!!t.xmlDeclaration:!0,N=typeof t.predefined<"u"?!!t.predefined:!1,m=N?n+'<defs><path id="qrmodule" d="M0 0 h'+h+" v"+f+' H0 z" style="fill:'+t.color+';shape-rendering:crispEdges;" /></defs>'+a:"",b=n+'<rect x="0" y="0" width="'+s+'" height="'+o+'" style="fill:'+t.background+';shape-rendering:crispEdges;"/>'+a,P="",F="",y=0;y<u;y++)for(var O=0;O<u;O++){var J=i[O][y];if(J){var D=O*f+t.padding*f,_=y*h+t.padding*h;if(L){var $=D;D=_,_=$}if(w){var R=f+D,k=h+_;D=Number.isInteger(D)?Number(D):D.toFixed(2),_=Number.isInteger(_)?Number(_):_.toFixed(2),R=Number.isInteger(R)?Number(R):R.toFixed(2),k=Number.isInteger(k)?Number(k):k.toFixed(2),F+="M"+D+","+_+" V"+k+" H"+R+" V"+_+" H"+D+" Z "}else N?P+=n+'<use x="'+D.toString()+'" y="'+_.toString()+'" href="#qrmodule" />'+a:P+=n+'<rect x="'+D.toString()+'" y="'+_.toString()+'" width="'+f+'" height="'+h+'" style="fill:'+t.color+';shape-rendering:crispEdges;"/>'+a}}w&&(P=n+'<path x="0" y="0" style="fill:'+t.color+';shape-rendering:crispEdges;" d="'+F+'" />');var E="";switch(e.container){case"svg":M&&(E+='<?xml version="1.0" standalone="yes"?>'+a),E+='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="'+s+'" height="'+o+'">'+a,E+=m+b+P,E+="</svg>";break;case"svg-viewbox":M&&(E+='<?xml version="1.0" standalone="yes"?>'+a),E+='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 '+s+" "+o+'">'+a,E+=m+b+P,E+="</svg>";break;case"g":E+='<g width="'+s+'" height="'+o+'">'+a,E+=m+b+P,E+="</g>";break;default:E+=(m+b+P).replace(/^\s+/,"");break}return E},H.prototype.save=function(e,t){var i=this.svg();typeof t!="function"&&(t=function(n,a){});try{var r=K;r.writeFile(e,i,t)}catch(n){t(n)}},d.exports=H})(Q);var X=Q.exports;const z=G(X);function Y(d){if(d!==void 0){var A=new z({content:d,container:"svg"});return A.svg()}}return Y}();
