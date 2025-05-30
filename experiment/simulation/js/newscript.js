var simstatus = 0;
var rotstatus = 1;
//comments section
var commenttext = "Some Text";
var commentloc = 0;
//computing section
var trans = new point(50, 75);
var transV = new point(450, 75);
var transA = new point(250, 250);
var scaleP = 0.5;
var scaleV = 0.5;
var scaleA = 2;
var o = new point(0, 0, "");
var a = new point(0, 0, "");
var b = new point(0, 0, "");
var vo = new point(0, 0, "O");
var va = new point(0, 0, "a");
var vb = new point(0, 0, "b");
var vba = new point(0, 0, "ba");
var ao = new point(0, 0, "AO");
var aa = new point(0, 0, "Aa");
var ab = new point(0, 0, "Ab");
var aba = new point(0, 0, "Aba");
var acba = new point(0, 0, "ACba");
var atba = new point(0, 0, "ATba");
var Va = new point(0, 0, "Va");
var Vb = new point(0, 0, "Vb");
var Vba = new point(0, 0, "Vba");

//var d= new point(0,0,"D");

var theta2 = 40; // all angles to be defined either in degrees only or radians only throughout the program and convert as and when required
var phi = 0; // All angles in Degrees. (mention the specification in the script like here)
var omega2 = 1; // angular velocity in rad/s
var omega3 = 0;
(theta3 = 0), (alpha3 = 0);
var vela = 0,
  velba = 0,
  velb = 0;
var accta = 0,
  accca = 0,
  acca = 0,
  acctba = 0,
  acccba = 0,
  accba = 0,
  accb = 0;
var angba = 0;
var r = 0,
  l = 0;
var flaggrashof = true;
//graphics section
var canvas, canvas2;
var ctx, ctx2;
//timing section
var simTimeId = setInterval("", "1000");
var pauseTime = setInterval("", "1000");
var time = 0;
//point tracing section
var ptx = [];
var pty = [];
//click status of legend and quick reference
var legendCS = false;
var quickrefCS = false;
//temporary or dummy variables
var temp = 0;
var offset = 0;
/*
// for trials during development
function trythis()
{ 		alert();}
*/

//change simulation specific css content. e.g. padding on top of variable to adjust appearance in variables window
function editcss() {
  $(".variable").css("padding-top", "25px");
  // $("#datatable1").css("position", "absolute");
  // $("#datatable2").css("position", "absolute");
  $("#legend").css("width", document.getElementById("legendimg").width + "px");
  $("#legend").css(
    "height",
    document.getElementById("legendimg").height + "px"
  );
  //$('#quickref').css("height",document.getElementById('quickrefimg').height+"px");
  $("#legend").css("left", "490px");
  $("#legend").css("top", "320px");
  // $("#datatable1").css("left", "100px");
  // $("#datatable1").css("top", "250px");

  // $("#datatable2").css("left", "480px");
  // $("#datatable2").css("top", "430px");
  // $("#datatable2").css("border", "0");
  // $("#datatable2").css("border", "70px");
  // $("#datatable2").css("font-size", "13px");
  // $("#datatable2").css("font-family", "'Comic Sans MS'");
  // $("#datatable2").css("color", "#CD3401");
  $("#commentboxright").css("font-size", "14px");
}

//start of simulation here; starts the timer with increments of 0.1 seconds
function startsim() {
  simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
}

// switches state of simulation between 0:Playing & 1:Paused
function simstate() {
  var imgfilename = document.getElementById("playpausebutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename == "bluepausedull") {
    document.getElementById("playpausebutton").src = "images/blueplaydull.svg";
    clearInterval(simTimeId);
    simstatus = 1;
    $("#theta2spinner").spinner("value", theta2); //to set simulation parameters on pause
    pauseTime = setInterval("varupdate();", "100");
    document.querySelector(".playPause").textContent = "Play";
  }
  if (imgfilename == "blueplaydull") {
    time = 0;
    clearInterval(pauseTime);
    document.getElementById("playpausebutton").src = "images/bluepausedull.svg";
    simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
    simstatus = 0;
    document.querySelector(".playPause").textContent = "Pause";
  }
}

// switches state of rotation between 1:CounterClockWise & -1:Clockwise
function rotstate() {
  var imgfilename = document.getElementById("rotationbutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename == "bluecwdull") {
    document.getElementById("rotationbutton").src = "images/blueccwdull.svg";
    rotstatus = -1;
  }
  if (imgfilename == "blueccwdull") {
    document.getElementById("rotationbutton").src = "images/bluecwdull.svg";
    rotstatus = 1;
  }
}

/*
//Displaying Equations for Quick Reference
function showEquations()
{
	if(quickrefCS)
	{
		$('#quickreficon').css('border', 'double');
		$('#quickref').css('width', '0px');
		$('#quickref').css('left', '600px');
		$('#quickref').css('border', '0px');
		quickrefCS=false;	
		
	}
	else
	{
		$('#quickreficon').css('border', 'inset red');
		$('#quickref').css('width', document.getElementById('quickrefimg').width+"px");
		$('#quickref').css("left", 599-document.getElementById('quickrefimg').width+"px");
		$('#quickref').css('border', 'solid 1px');
		quickrefCS=true;	
	}
}*/

//Displaying Legend
function showLegend() {
  if (legendCS) {
    $("#legendicon").css("border", "double");
    $("#legend").css("height", "0px");
    $("#legend").css("border", "0px");
    legendCS = false;
  } else {
    $("#legendicon").css("border", "inset red");
    $("#legend").css(
      "height",
      document.getElementById("legendimg").height + "px"
    );
    $("#legend").css("border", "solid 1px");
    legendCS = true;
  }
}

//Initialise system parameters here
function varinit() {
  varchange();
  //Variable r1 slider and number input types
  //$('#r1slider').slider("value", 80);
  //$('#r1spinner').spinner("value", 80);
  //Variable r2 slider and number input types
  $("#r2slider").slider("value", 40);
  $("#r2spinner").spinner("value", 40);
  //Variable r3 slider and number input types
  $("#r3slider").slider("value", 100);
  $("#r3spinner").spinner("value", 100);
  //Variable r4 slider and number input types
  //$('#r4slider').slider("value", 60);
  //$('#r4spinner').spinner("value", 60);
  //Variable theta2 slider and number input types
  $("#theta2slider").slider("value", 40);
  $("#theta2spinner").spinner("value", 40);
  //Variable omega2 slid er and number input types
  $("#omega2slider").slider("value", 1);
  $("#omega2spinner").spinner("value", 1);
}

// Initialise and Monitor variable containing user inputs of system parameters.
//change #id and repeat block for new variable. Make sure new <div> with appropriate #id is included in the markup
function varchange() {
  /*//Variable r1 slider and number input types
$('#r1slider').slider({ max : 100, min : 20, step : 2 });		// slider initialisation : jQuery widget
$('#r1spinner').spinner({ max : 100, min : 20, step : 2 });		// number initialisation : jQuery widget			
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#r1slider" ).on( "slide", function( e, ui ) { $('#r1spinner').spinner("value",ui.value); ptx=[]; pty=[]; } );
$( "#r1spinner" ).on( "spin", function( e, ui ) { $('#r1slider').slider("value",ui.value); ptx=[]; pty=[]; } );
$( "#r1spinner" ).on( "change", function() {  varchange() } );
*/
  //Variable r2 slider and number input types
  $("#r2slider").slider({ max: 60, min: 20, step: 2 }); // slider initialisation : jQuery widget
  $("#r2spinner").spinner({ max: 60, min: 20, step: 2 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#r2slider").on("slide", function (e, ui) {
    $("#r2spinner").spinner("value", ui.value);
    updateR3Limits(ui.value, false);
    ptx = [];
    pty = [];
  });
  $("#r2spinner").on("spin", function (e, ui) {
    $("#r2slider").slider("value", ui.value);
    updateR3Limits(ui.value, false);
    ptx = [];
    pty = [];
  });
  $("#r2spinner").on("change", function () {
    updateR3Limits($("#r2spinner").spinner("value"), false);
    varchange();
  });

  //Variable r3 slider and number input types
  $("#r3slider").slider({ max: 240, min: 80, step: 2 }); // slider initialisation : jQuery widget
  $("#r3spinner").spinner({ max: 240, min: 80, step: 2 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#r3slider").on("slide", function (e, ui) {
    $("#r3spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#r3spinner").on("spin", function (e, ui) {
    $("#r3slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#r3spinner").on("change", function () {
    varchange();
  });

  /*//Variable r4 slider and number input types
$('#r4slider').slider({ max : 100, min : 20, step : 2 });		// slider initialisation : jQuery widget
$('#r4spinner').spinner({ max : 100, min : 20, step : 2 });		// number initialisation : jQuery widget			
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#r4slider" ).on( "slide", function( e, ui ) { $('#r4spinner').spinner("value",ui.value); ptx=[]; pty=[]; } );
$( "#r4spinner" ).on( "spin", function( e, ui ) { $('#r4slider').slider("value",ui.value); ptx=[]; pty=[]; } );
$( "#r4spinner" ).on( "change", function() {  varchange() } );
*/
  //Variable theta2 slider and number input types
  $("#theta2slider").slider({ max: 360, min: 0, step: 2 }); // slider initialisation : jQuery widget
  $("#theta2spinner").spinner({ max: 360, min: 0, step: 2 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#theta2slider").on("slide", function (e, ui) {
    $("#theta2spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#theta2spinner").on("spin", function (e, ui) {
    $("#theta2slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#theta2spinner").on("change", function () {
    varchange();
  });

  //Variable omega2 slider and number input types
  $("#omega2slider").slider({ max: 5, min: 1, step: 0.2 }); // slider initialisation : jQuery widget
  $("#omega2spinner").spinner({ max: 5, min: 1, step: 0.2 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#omega2slider").on("slide", function (e, ui) {
    $("#omega2spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#omega2spinner").on("spin", function (e, ui) {
    $("#omega2slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#omega2spinner").on("change", function () {
    varchange();
  });

  varupdate();
}

function updateR3Limits(r2Value, updateSlider) {
  const maxR3 = 6 * r2Value;
  const minR3 = 2.5 * r2Value;

  $("#r3slider").slider("option", "max", maxR3);
  $("#r3slider").slider("option", "min", minR3);
  $("#r3spinner").spinner("option", "max", maxR3);
  $("#r3spinner").spinner("option", "min", minR3);

  const r3Value = $("#r3spinner").spinner("value");
  if (r3Value < minR3) {
    $("#r3spinner").spinner("value", minR3);
    if (updateSlider) {
      $("#r3slider").slider("value", minR3);
    }
  } else if (r3Value > maxR3) {
    $("#r3spinner").spinner("value", maxR3);
    if (updateSlider) {
      $("#r3slider").slider("value", maxR3);
    }
  } else {
    $("#r3spinner").spinner("value", r3Value);
    if (updateSlider) {
      $("#r3slider").slider("value", r3Value);
    }
  }
}

//Computing of various system parameters
function varupdate() {
  $("#r2slider").slider("value", $("#r2spinner").spinner("value")); //updating slider location with change in spinner(debug)
  $("#r3slider").slider("value", $("#r3spinner").spinner("value"));
  $("#theta2slider").slider("value", $("#theta2spinner").spinner("value"));

  r = $("#r2spinner").spinner("value");
  l = $("#r3spinner").spinner("value");
  $("#r3slider").slider({ max: 6 * $("#r2slider").slider("value") });
  $("#r3slider").slider({ min: 2.5 * $("#r2slider").slider("value") });
  $("#r3spinner").spinner({ max: 6 * $("#r2slider").slider("value") });
  $("#r3spinner").spinner({ min: 2.5 * $("#r2slider").slider("value") });
  if (!simstatus) {
    $("#omega2slider").slider("enable");
    $("#omega2spinner").spinner("enable");

    $("#theta2slider").slider("disable");
    $("#theta2spinner").spinner("disable");

    omega2 = rotstatus * $("#omega2spinner").spinner("value");

    theta2 = theta2 + 0.1 * deg(omega2);
    theta2 = theta2 % 360;
    if (theta2 < 0) theta2 += 360;
    printcomment("Acceleration analysis of Slider Crank Mechanism", 1);
  }
  if (simstatus) {
    $("#theta2slider").slider("enable");
    $("#theta2spinner").spinner("enable");
    $("#omega2slider").slider("disable");
    $("#omega2spinner").spinner("disable");
    omega2 = rotstatus * $("#omega2spinner").spinner("value");
    theta2 = $("#theta2spinner").spinner("value");

    printcomment(
      "Acceleration Diagram (at &theta;<sub>2</sub> =" + theta2 + "&deg;)",
      1
    );
  }

  //Position Calculations
  phi = deg(Math.asin((r * Math.sin(rad(theta2))) / l));
  theta3 = -phi;
  //Position Scale Calculation
  if (r < 30) scaleP = 1;
  if (r > 30) scaleP = 0.5;
  //Position Coordinate Definitions
  o.xcoord = 0;
  o.ycoord = 0;
  a.xcoord = o.xcoord + scaleP * r * Math.cos(rad(theta2));
  a.ycoord = o.ycoord + scaleP * r * Math.sin(rad(theta2));
  b.xcoord = a.xcoord + scaleP * l * Math.cos(rad(theta3));
  b.ycoord = a.ycoord + scaleP * l * Math.sin(rad(theta3));

  //Velocity Calculations
  vela = r * omega2;
  omega3 = (-r * omega2 * Math.cos(rad(theta2))) / (l * Math.cos(rad(theta3)));
  t3 = l * omega3;
  velba = l * omega3;
  velb =
    -r * omega2 * Math.sin(rad(theta2)) - l * omega3 * Math.sin(rad(theta3));

  //Velocity Scale Calculation
  if (Math.abs(r * omega2) < 50) scaleV = 2;
  else if (Math.abs(r * omega2) >= 50 && Math.abs(r * omega2) < 100) scaleV = 1;
  else if (Math.abs(r * omega2) >= 100 && Math.abs(r * omega2) < 250)
    scaleV = 0.5;
  else if (Math.abs(r * omega2) >= 250) scaleV = 0.125;
  else scaleV = 0.5;

  //Velocity Coordinate Definitions
  vo.xcoord = 0;
  vo.ycoord = 0;
  va.xcoord = vo.xcoord + scaleV * vela * Math.cos(rad(90 + theta2));
  va.ycoord = vo.ycoord + scaleV * vela * Math.sin(rad(90 + theta2));
  vba.xcoord = va.xcoord + scaleV * velba * Math.cos(rad(90 + theta3));
  vba.ycoord = va.ycoord + scaleV * velba * Math.sin(rad(90 + theta3));
  vb.xcoord = vo.xcoord + scaleV * velb * Math.cos(rad(0));
  vb.ycoord = vo.ycoord + scaleV * velb * Math.sin(rad(0));
  //printcomment(pointdist(vo,vba)+" calc "+velb,1);

  //printcomment("Limits of l for the set r : "+$('#r3spinner').spinner("option","min")+" and\n "+$('#r3spinner').spinner("option","max")+" ",1);

  var t1 = 0;
  //Acceleration Calculations
  accca = r * omega2 * omega2;
  accta = 0;
  acca = Math.sqrt(accta * accta + accca * accca);

  acccba = l * omega3 * omega3;

  acctba =
    (acca * Math.sin(rad(theta2)) - acccba * Math.sin(rad(phi))) /
    Math.cos(rad(phi));
  alpha3 = acctba / l;

  accba = Math.sqrt(acctba * acctba + acccba * acccba);

  accb = -(
    accca * Math.cos(rad(theta2)) +
    acccba * Math.cos(rad(theta3)) +
    acctba * Math.sin(rad(theta3))
  );

  printcomment("", 2);
  //Acceleration Scale Calculation
  if (Math.abs(r * omega2 * omega2) < 80) scaleA = 2;
  else if (
    Math.abs(r * omega2 * omega2) >= 80 &&
    Math.abs(r * omega2 * omega2) < 150
  )
    scaleA = 1;
  else if (
    Math.abs(r * omega2 * omega2) >= 150 &&
    Math.abs(r * omega2 * omega2) < 350
  )
    scaleA = 0.5;
  else if (
    Math.abs(r * omega2 * omega2) >= 350 &&
    Math.abs(r * omega2 * omega2) < 700
  )
    scaleA = 0.25;
  else if (
    Math.abs(r * omega2 * omega2) >= 700 &&
    Math.abs(r * omega2 * omega2) < 1000
  )
    scaleA = 0.125;
  else if (Math.abs(r * omega2 * omega2) >= 1000) scaleA = 0.0625;
  else;

  //Acceleration Coordinate Definitions
  ao.xcoord = 0;
  ao.ycoord = 0;
  aa.xcoord = ao.xcoord + scaleA * acca * Math.cos(rad(180 + theta2));
  aa.ycoord = ao.ycoord + scaleA * acca * Math.sin(rad(180 + theta2));
  acba.xcoord = aa.xcoord + scaleA * acccba * Math.cos(rad(180 + theta3));
  acba.ycoord = aa.ycoord + scaleA * acccba * Math.sin(rad(180 + theta3));
  atba.xcoord = acba.xcoord + scaleA * acctba * Math.cos(rad(90 + theta3));
  atba.ycoord = acba.ycoord + scaleA * acctba * Math.sin(rad(90 + theta3));
  aba.xcoord = atba.xcoord;
  aba.ycoord = atba.ycoord;
  ab.xcoord = ao.xcoord + scaleA * accb * Math.cos(0);
  ab.ycoord = ao.ycoord + scaleA * accb * Math.sin(0);

  printcomment(
    "V<sub>yx</sub>=Velocity of y with respect to x<br>A<sub>yx</sub>=Acceleration of y with respect to x",
    2
  );
  draw();
}

//Simulation graphics
function draw() {
  canvas = document.getElementById("simscreen");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 550, 350); //clears the complete canvas#simscreen everytime

  pointtrans(o, trans);
  pointtrans(a, trans);
  pointtrans(b, trans);

  //Crank Center and Sliding base
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 10;
  ctx.moveTo(o.xcoord, o.ycoord); //crank center
  ctx.lineTo(o.xcoord, o.ycoord + 5);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#666666";
  ctx.moveTo(25, o.ycoord + 10); //sliding base line
  ctx.lineTo(275, o.ycoord + 10);
  ctx.stroke();
  ctx.closePath();

  //Position Diagram
  pointjoin(o, a, ctx, "#FF0000", 5);

  pointdisp(o, ctx, 2, "#000000", "#000", "", "", "");

  pointjoin(a, b, ctx, "#330099", 5);

  pointdisp(a, ctx, 8, "#00FFCC", "#00FFCC", "", "", "");

  pointdisp(b, ctx, 5, "#000000", "#003366", "", "", "");

  drawrem(ctx);

  // displaying sliding link
  ctx.globalAlpha = 0.7;
  drawrect(b, 30, 15, 5, ctx, "#808080", "#808080", 1);
  ctx.globalAlpha = 1;
  // Displaying points A and B
  ctx.fillStyle = "#000";
  ctx.fillText("B", b.xcoord - 3, b.ycoord + 3);
  ctx.fillText("A", a.xcoord - 3, a.ycoord + 3);

  //displaying scale values
  ctx.save();
  ctx.translate(0.75, 0.75);
  ctx.font = " 16px 'Comic Sans MS'";
  document.getElementById("titleincanvas").innerHTML = "Non Grash of Mechanism";
  if (scaleP >= 1) ctx.fillText("Scale = 1:" + scaleP, 15, 30);
  if (scaleP < 1) ctx.fillText("Scale = " + 1 / scaleP + ":1", 15, 30);

  if (scaleV >= 1) ctx.fillText("Scale = 1:" + scaleV, 315, 30);
  if (scaleV < 1) ctx.fillText("Scale = " + 1 / scaleV + ":1", 315, 30);

  if (scaleA >= 1) ctx.fillText("Scale = 1:" + scaleA, 425, 180);
  if (scaleA < 1) ctx.fillText("Scale = " + 1 / scaleA + ":1", 425, 180);
  ctx.restore();

  //dashed line to separate position and velocity diagrams from accleration diagram
  ctx.save();
  ctx.setLineDash([5, 15]);
  ctx.beginPath();
  ctx.moveTo(0, 130);
  ctx.lineTo(550, 130);
  ctx.moveTo(300, 0);
  ctx.lineTo(300, 140);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();

  drawvel(ctx);
  drawacc(ctx);

  /* if(document.getElementById("trace").checked==true)
  {
  pointtrace(ptx,pty,ctx,"blue",2);
  pointdisp(p,ctx,2,'','','',true,1);
  }
  else
  {
  ptx=[];
  pty=[];
  }*/
}
function drawvel(context) {
  //Velocity Diagram
  vo = pointtrans(vo, transV);
  va = pointtrans(va, transV);
  vba = pointtrans(vba, transV);
  vb = pointtrans(vb, transV);

  pointjoin(vo, va, context, "#FF0000", 2);
  drawArrow(
    va.xcoord,
    va.ycoord,
    context,
    180 - theta2 - rotstatus * 90,
    15,
    30,
    "#FF0000"
  );

  pointjoin(va, vba, context, "#330099", 2);
  drawArrow(
    vba.xcoord,
    vba.ycoord,
    context,
    180 - (theta3 + signof(velba) * 90),
    15,
    30,
    "#330099"
  );

  pointjoin(vo, vb, context, "#000000", 2);
  drawArrow(
    vb.xcoord,
    vb.ycoord,
    context,
    90 + signof(velb) * 90,
    15,
    30,
    "#000000"
  );

  (Va.xcoord = (vo.xcoord + va.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Va.ycoord = (vo.ycoord + va.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Va, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Vba.xcoord = (va.xcoord + vba.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Vba.ycoord = (va.ycoord + vba.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Vba, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Vb.xcoord = (vo.xcoord + vb.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Vb.ycoord = (vo.ycoord + vb.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Vb, ctx, 2, "blue", "white", "black", "12px", "12px");

  //velocity diagram vector labels
  document.getElementById("va").style.position = "absolute";
  document.getElementById("vba").style.position = "absolute";
  document.getElementById("vb").style.position = "absolute";
  document.getElementById("va").style.margin = "0";
  document.getElementById("vba").style.margin = "0";
  document.getElementById("vb").style.margin = "0";
  document.getElementById("va").style.width = "20px";
  document.getElementById("va").style.height = "20px";
  document.getElementById("vba").style.width = "20px";
  document.getElementById("vba").style.height = "20px";
  document.getElementById("vb").style.width = "20px";
  document.getElementById("vb").style.height = "20px";
  document.getElementById("va").style.fontSize = "11px";
  document.getElementById("vba").style.fontSize = "11px";
  document.getElementById("vb").style.fontSize = "11px";
  document.getElementById("va").style.left =
    "" + (-10 + Math.round(60 + vo.xcoord + va.xcoord) / 2) + "px";
  document.getElementById("va").style.top =
    "" + (-10 + Math.round(200 + vo.ycoord + va.ycoord) / 2) + "px";
  document.getElementById("vba").style.left =
    "" + (-10 + Math.round(60 + vba.xcoord + va.xcoord) / 2) + "px";
  document.getElementById("vba").style.top =
    "" + (-10 + Math.round(200 + vba.ycoord + va.ycoord) / 2) + "px";
  document.getElementById("vb").style.left =
    "" + (-10 + Math.round(60 + vb.xcoord + vo.xcoord) / 2) + "px";
  document.getElementById("vb").style.top =
    "" + (-10 + Math.round(200 + vb.ycoord + vo.ycoord) / 2) + "px";
}
function drawrem(context) {
  /*
// positioning dimension display  
   if(theta2%360<=180)
	  offset=-45;
	else
	  offset=20;

// dimension line      
   context.save();
   context.moveTo(o.xcoord,o.ycoord-offset);
	context.lineWidth=3;
   context.strokeStyle="#000000";
	context.lineTo(b.xcoord,o.ycoord-offset);
	context.moveTo(o.xcoord,o.ycoord-offset+5);
	context.lineTo(o.xcoord,o.ycoord-offset-5);
	context.moveTo(b.xcoord,o.ycoord-offset+5);
	context.lineTo(b.xcoord,o.ycoord-offset-5);
	context.stroke();
	
// arrows at dimension
  drawArrow(b.xcoord,b.ycoord-offset,context,180,15,30,'#000','',"#000");
  drawArrow(o.xcoord,o.ycoord-offset,context,0,15,30,'#000','',"#000");
*/

  // Analysis Titles
  context.save();
  context.translate(0.5, 0.5);
  context.lineWidth = 1;
  context.font = " bold 14px 'Comic Sans MS'";
  context.fillStyle = "#000000";
  context.fillText("Position Diagram", 15, 15);
  context.restore();
  context.save();
  context.translate(0.5, 0.5);
  context.lineWidth = 1;
  context.font = " bold 14px 'Comic Sans MS'";
  context.fillStyle = "#000000";
  context.fillText("Velocity Diagram", 315, 15);
  context.restore();
  context.save();
  context.translate(0.5, 0.5);
  context.lineWidth = 1;
  context.font = "16px 'Comic Sans MS'";
  context.fillStyle = "#000000";
  context.fillText("Acceleration Diagram", 375, 160);
  context.restore();
  // r, l, d display
  context.save();
  context.lineWidth = 1;
  context.strokeStyle = "#000000";
  context.font = "10px Arial";
  //	context.fillText('d', (o.xcoord+b.xcoord)/2,o.ycoord-offset-10);
  context.fillText(
    "r",
    (o.xcoord + a.xcoord) / 2 - 1,
    (o.ycoord + a.ycoord) / 2 + 1
  );
  context.fillText(
    "l",
    (a.xcoord + b.xcoord) / 2 - 1,
    (a.ycoord + b.ycoord) / 2 + 3
  );
  context.restore();
}
function drawacc(context) {
  document.getElementById("datatable1").innerHTML =
    "\
<table>\
<tr><th>Variable</th><th>Value</th><th class='unit'>(Unit)</th></tr>\
<tr><td>A<sub>a</sub><sup>t</sup></td><td>" +
    roundd(accta, 2) +
    "</td><td class='unit'>mm/s<sup>2</sup></td></tr>\
<tr><td>A<sub>a</sub><sup>c</sup></td><td>" +
    roundd(accca, 2) +
    "</td><td class='unit'>mm/s<sup>2</sup></td></tr>\
<tr><td>A<sub>a</sub></td><td>" +
    roundd(acca, 2) +
    "</td><td class='unit'>mm/s<sup>2</sup></td></tr>\
<tr><td>A<sub>ba</sub><sup>t</sup></td><td>" +
    roundd(acctba, 2) +
    "</td><td class='unit'>mm/s<sup>2</sup></td></tr>\
<tr><td>A<sub>ba</sub><sup>c</sup></td><td>" +
    roundd(acccba, 2) +
    "</td><td class='unit'>mm/s<sup>2</sup></td></tr>\
<tr><td>A<sub>ba</sub></td><td>" +
    roundd(accba, 2) +
    "</td><td class='unit'>mm/s<sup>2</sup></td></tr>\
<tr><td>A<sub>b</sub></td><td>" +
    roundd(accb, 2) +
    "</td><td class='unit'>mm/s<sup>2</sup></td></tr>\
<tr><td>&alpha;<sub>BA</sub></td><td>" +
    roundd(alpha3, 2) +
    "</td><td class='unit'>rad/s<sup>2</sup></td></tr>\
<tr><td>&omega;<sub>3</sub></td><td>" +
    roundd(omega3, 2) +
    "</td><td class='unit'>rad/s<sup>2</sup></td></tr>\
</table>";

  //   document.getElementById("datatable2").innerHTML =
  //     "\
  // <table>\
  // <tr><td>Centripetal Acc</td></tr>\
  // <tr><td>Tangential Acc</td></tr>\
  // <tr><td>Total Acc</td></tr>\
  // </table>";

  //Acceleration Diagram
  ao = pointtrans(ao, transA);
  aa = pointtrans(aa, transA);
  ab = pointtrans(ab, transA);
  aba = pointtrans(aba, transA);
  acba = pointtrans(acba, transA);
  atba = pointtrans(atba, transA);
  angba = deg(Math.atan((aba.ycoord - aa.ycoord) / (aba.xcoord - aa.xcoord)));
  pointjoin(ao, aa, context, "#FF0000", 2);
  drawArrow(aa.xcoord, aa.ycoord, context, -theta2, 15, 30, "#FF0000");
  pointjoin(ao, ab, context, "#000000", 2);
  drawArrow(
    ab.xcoord,
    ab.ycoord,
    context,
    90 + signof(accb) * 90,
    15,
    30,
    "#000000"
  );

  // pointjoin(aa, aba, context, "#330099", 2);
  // context.moveTo(380, 390);
  // context.lineTo(430, 390);
  // context.stroke();
  drawArrow(
    aba.xcoord,
    aba.ycoord,
    context,
    90 - signof(aa.xcoord - aba.xcoord) * 90 + angba,
    15,
    30,
    "#330099"
  );

  drawArrow(
    atba.xcoord,
    atba.ycoord,
    context,
    phi + signof(acctba) * 90,
    15,
    30,
    "#330099"
  );
  drawArrow(acba.xcoord, acba.ycoord, context, -theta3, 15, 30, "#330099");

  context.save();

  context.beginPath();
  // context.strokeStyle = "#330099";
  // // context.setLineDash([5, 5]);
  // context.moveTo(380, 348);
  // context.lineTo(430, 348);
  // context.stroke();
  context.lineWidth = 0;
  context.font = "16px 'Comic Sans MS'";
  context.fillStyle = "#000000";
  // context.fillText("Total Acc", 430, 395);
  pointjoin(aa, acba, context, "#330099", 1);

  context.save();
  context.translate(0.5, 0.5);
  context.lineWidth = 1;
  context.font = "16px 'Comic Sans MS'";
  context.fillStyle = "#000000";
  // context.fillText("Centripetal Acc", 430, 350);
  context.restore();
  context.closePath();
  context.beginPath();
  context.strokeStyle = "#330099";
  // context.setLineDash([10, 10]);
  // context.moveTo(380, 368);
  // context.lineTo(430, 368);
  // context.stroke();
  pointjoin(acba, atba, context, "#330099", 1);
  context.save();
  context.translate(0.5, 0.5);
  context.lineWidth = 1;
  context.font = "16px 'Comic Sans MS'";
  context.fillStyle = "#000000";
  // context.fillText("Tangential Acc", 430, 370);
  context.restore();
  context.closePath();
  context.restore();
}

// prints comments passed as 'commenttext' in location specified by 'commentloc' in the comments box;
// 0 : Single comment box, 1 : Left comment box, 2 : Right comment box
function printcomment(commenttext, commentloc) {
  if (commentloc == 0) {
    document.getElementById("commentboxright").style.visibility = "hidden";
    document.getElementById("commentboxleft").style.width = "570px";
    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 1) {
    document.getElementById("commentboxright").style.visibility = "visible";
    document.getElementById("commentboxleft").style.width = "285px";
    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 2) {
    document.getElementById("commentboxright").style.visibility = "visible";
    document.getElementById("commentboxleft").style.width = "285px";
    document.getElementById("commentboxright").innerHTML = commenttext;
  } else {
    document.getElementById("commentboxright").style.visibility = "hidden";
    document.getElementById("commentboxleft").style.width = "570px";
    document.getElementById("commentboxleft").innerHTML =
      "<center>please report this issue to adityaraman@gmail.com</center>";
    // ignore use of deprecated tag <center> . Code is executed only if printcomment function receives inappropriate commentloc value
  }
}
