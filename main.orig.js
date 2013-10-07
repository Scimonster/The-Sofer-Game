$(document).ready(function(){

var
	points = 0,
	outside = "#09099C",
	inside = "#9ADFF6",
	font = "70pt Sofer,serif bold",
	welcomeFont = "50pt serif bold",
	fontColor = "black",
	can,
	ctx,
	perekTime = 0,
	firstPerekPoints = 0;

	// set up TypeR
	$.each($('#heb').text().split(''),function(i,l){
		$('#typer').append('<span>'+$('#eng').text().split('')[i]+'-'+l+'</span>');
	});
	$('#heb,#eng').remove();
	$('<span style="width:106px"><a href="http://typeint.com/typer" style="color:inherit;text-decoration:none;" target="_blank">full version</a></span>').appendTo('#typer');
	$('#open-close-typer').click(function(){$('#typer').toggle('slow');$('#open-close-typer span').toggle()});
	$('#music-control').click(function(){if($('#music')[0].paused){$('#music')[0].play()}else{$('#music')[0].pause()}$('#music-control span').toggle()});
	$('#typer span').click(function(){
		var t = this;
		var e = $.Event('keypress',{which:$(t).text().split('')[2].charCodeAt(0)});
//		console.log($(t).text().split('')[2].charCodeAt(0));
		$(document).trigger(e);
	});
	
	can = $('#world');
//	can.mousemove(function(e){$('#paths').html(e.clientX + ', ' + e.clientY)});
	can.hide().css('backgroundColor',outside);
	$(window).keypress(function(e){
		//console.log(e.which);
		if (e.keyCode === 33) { // pg up
			can.css('top','+=100');
			e.preventDefault();
		}
		if (e.keyCode === 34) { // pg dn
			can.css('top','-=100');
			e.preventDefault();
		}
		if (e.keyCode === 35) { // end
			can.css('left','-=100');
			e.preventDefault();
		}
		if (e.keyCode === 36) { // home
			can.css('left','+=100');
			e.preventDefault();
		}
		if (e.keyCode === 37) { // left
			can.css('left','+=10');
		}
		if (e.keyCode === 39) { // right
			can.css('left','-=10');
		}
		if (e.keyCode === 38) { // up
			can.css('top','+=10');
		}
		if (e.keyCode === 40) { // down
			can.css('top','-=10');
		}
		//$('#time').text(parseInt(can.css('top'),10)+', '+parseInt(can.css('left'),10)).width(250);
	});
	ctx = can[0].getContext('2d');

	var img = new Image();
	img.src = 'tiles.png';
	img.onload = function(){
		inside = ctx.createPattern(img,'repeat');
		//$('#start').click();
	};
	
	$('.next').click(function(){
		var old = $('#introduction>div').filter(":visible");
		old.hide('fast');
		old.siblings(':nth-child('+(old.index()+2)+')').show('fast');
		$('#introduction').css('padding',5);
		if ($(this).attr('src')=="next.png") {
			setTimeout(function(){$('#start').removeClass('disabled')},5000);
		}
	});
	$('#start').click(function(){
		$('#introduction').hide('fast');
		$('#world-container').css('height','500px');
		$('#points,#time,#open-close-typer,#world,#music-control').show('fast');
		$('#points span').text(points);
		lvl1();
	});

function updatePoints(change) {
	points += change;
	$('<div></div>').text(function(){
		if (change>0) {return "+"+change}
		else {return change}
	}).css({position:'absolute',top:'45%',left:'45%',font:'bold 100pt \'Spin Cycle\'',userSelect:'none',mozUserSelect:'none',webkitUserSelect:'none',color:(function(){
		if (change>0) {return "darkGreen"}
		else {return "darkRed"}
	})()}).appendTo('#world-container').fadeIn(function(){
		$(this).animate({top:$('#points').position().top,left:$('#points').position().left},1000,'linear',function(){
			$('#points span').text(points);
			$(this).fadeOut().remove();
		});
	});
	//console.log(updatePoints.caller);
}

function lvl1 (){
	can.css({top:-4500,left:-1250});
	// paint maze
	ctx.fillStyle = outside;
	ctx.clearRect(0, 0, can.width(), can.height());
	ctx.fillRect(0, 0, can.width(), can.height());
	ctx.fillStyle = inside;
	ctx.fillRect(1500, 4000,  300, 1000); // v
	ctx.fillRect( 300, 4000, 2500,  300); // h
	ctx.fillRect( 300, 3500,  300,  500);
	ctx.fillRect(2800, 4000,  300,  650);
	ctx.fillRect(2800, 4400, 1000,  300);
	ctx.fillRect(3500, 4550, 1200,  300);
	ctx.fillRect(3500, 3200,  300, 1400);
	ctx.fillRect(2800, 3100, 1700,  300);
	ctx.fillRect(4500, 2500,  300,  900);
	ctx.fillRect(2800, 2000,  300, 1300);
	ctx.fillRect(1650, 2000, 1400,  300);
	ctx.fillRect(1350, 1500,  300, 1500);
	ctx.fillRect(1350, 1300,  900,  300);
	ctx.fillRect( 400, 2750, 1250,  300);
	ctx.fillRect( 400,  500,  300, 2300);
	ctx.fillRect( 400,  500, 3000,  300);
	ctx.fillRect(3400,   50,  300, 1750);
	ctx.fillRect(3400, 1500, 1150,  300);
	ctx.fillRect(4500,   50,  300, 1750);
	ctx.fillRect(4500,   50,  500,  300);
	ctx.fillRect(3800, 1650,  300, 1000);
	ctx.fillRect(3450, 2350,  400,  300);
	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('welcome', 1650, 4950);
	ctx.font = font;
	ctx.fillText('שְׁמַע'/*‪*/, 1850, 4210); // the seemingly empty comment contains U+202A
	ctx.fillText('וְאָהַבְתָּ'/*‪*/, 1400, 4210);
	ctx.save();
	ctx.translate(3700, 4370);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('יִשְׂרָאֵל'/*‪*/, -50, 0);
	ctx.restore();
	ctx.fillText('אֲשֶׁר'/*‪*/, 3750, 4730);
	ctx.fillText('יְהוָה'/*‪*/, 3430, 3300);
	ctx.fillText('לַעֲשׂוֹת'/*‪*/, 3860, 3300);
	ctx.save();
	ctx.translate(1450, 1750);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('אֱלֹהֵינוּ'/*‪*/, -550, 80);
	ctx.fillText('דִּבֶּר'/*‪*/, -270, 80);
	ctx.restore();
	ctx.fillText('יְהוָה'/*‪*/, 3550, 850);
	ctx.fillText('כִּי'/*‪*/, 3550, 540);
	ctx.fillText('אֶחָד'/*‪*/, 4150, 1690);
	ctx.save();
	ctx.translate(4000, 1900);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('הַמֶּלֶךְ'/*‪*/, 85, 0);
	ctx.restore();

	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	can.animate({top: -3940},2000,function(){
		var first = function(){
			$(document).on('keypress',function(e){
				if (e.which < 97) {e.which += 32}
				if (e.which == 97 || e.which == 1513) { // ש
					$(document).off('keypress');
					updatePoints(50);
					can.animate({left: -2570},2100,function(){
						can.animate({top: -4290},1000,function(){
							can.animate({left: -3250},1700,function(){
								var second = function(){
									$(document).on('keypress',function(e){
										if (e.which < 97) {e.which += 32}
										if (e.which == 104 || e.which == 1497) { // י
											$(document).off('keypress');
											updatePoints(50);
											can.animate({top: -3020},2500,function(){
												var third = function(){
													$(document).on('keypress',function(e){
														if (e.which < 97) {e.which += 32}
														if (e.which == 104 || e.which == 1497) { // י
															$(document).off('keypress');
															updatePoints(50);
															can.animate({left: -2580},2000,function(){
																can.animate({top: -1920},2500,function(){
																	can.animate({left: -1170},1800,function(){
																		var fourth = function(){
																			$(document).on('keypress',function(e){
																				if (e.which < 97) {e.which += 32}
																				if (e.which == 116 || e.which == 1488) { // א
																					$(document).off('keypress');
																					updatePoints(50);
																					can.animate({top: -2640},2000,function(){
																						can.animate({left: -240},2000,function(){
																							can.animate({top: -400},3000,function(){
																								can.animate({left: -3130},3400,function(){
																									var fifth = function(){
																										$(document).on('keypress',function(e){
																											if (e.which < 97) {e.which += 32}
																											if (e.which == 104 || e.which == 1497) { // י
																												$(document).off('keypress');
																												updatePoints(50);
																												can.animate({top: -1440},1900,function(){
																													can.animate({left: -3590},400,function(){
																														var sixth = function(){
																															$(document).on('keypress',function(e){
																																if (e.which < 97) {e.which += 32}
																																if (e.which == 116 || e.which == 1488) { // א
																																	$(document).off('keypress');
																																	updatePoints(50);
																																		can.animate({left: -4160},400,function(){
																																			can.animate({top: '0px'},1900,function(){
																																				can.animate({left: -4250},555,function(){
																																					// we're done!
																																					clearInterval(timeUpdate);
																																					finishLvl(1,points-oldPoints,Math.floor(Date.now()/1000)-startTime,perfection);
																																				});
																																			});
																																		});
																																}
																																if (e.which == 118 || e.which == 1492) { // ה
																																	$(document).off('keypress');
																																	perfection = false;
																																	can.animate({top: -2250},1100,function(){
																																		can.animate({left: -3280},400,function(){
																																			updatePoints(-50);
																																			can.animate({left: -3590},400,function(){
																																				can.animate({top: -1440},1100,function(){
																																					sixth();
																																				});
																																			});
																																		});
																																	});
																																}
																															});
																														};
																														sixth();
																													});
																												});
																											}
																											if (e.which == 102 || e.which == 1499) { // כ
																												$(document).off('keypress');
																												perfection = false;
																												can.animate({top: '0px'},375,function(){
																													updatePoints(-50);
																													can.animate({top: -400},375,function(){
																														fifth();
																													});
																												});
																											}
																										});
																									};
																									fifth();
																								});
																							});
																						});
																					});
																				}
																				if (e.which == 115 || e.which == 1491) { // ד
																					$(document).off('keypress');
																					perfection = false;
																					can.animate({top: -1210},1500,function(){
																						can.animate({left: -1650},1000,function(){
																							updatePoints(-50);
																							can.animate({left: -1290},1000,function(){
																								can.animate({top: -1920},1500,function(){
																									fourth();
																								});
																							});
																						});
																					});
																				}
																			});
																		};
																		fourth();
																	});
																});
															});
														}
														if (e.which == 107 || e.which == 1500) { // ל
															$(document).off('keypress');
															perfection = false;
															can.animate({left: -4180},1700,function(){
																can.animate({top: -2340},1700,function(){
																	updatePoints(-50);
																	can.animate({top: -3020},1700,function(){
																		can.animate({left: -3250},1700,function(){
																			third();
																		});
																	});
																});
															});
														}
													});
												};
												third();
											});
										}
										if (e.which == 116 || e.which == 1488) { // א
											$(document).off('keypress');
											perfection = false;
											can.animate({top: -4440},500,function(){
												can.animate({left: -4140},1700,function(){
													updatePoints(-50);
													can.animate({left: -3250},1700,function(){
														can.animate({top: -4290},500,function(){
															second();
														});
													});
												});
											});
										}
									});
								};
								second();
							});
						});
					});
				}
				if (e.which == 117 || e.which == 1493) { // ו
					$(document).off('keypress');
					perfection = false;
					can.animate({left: -110},2000,function(){
						can.animate({top: -3360},2000,function(){
							updatePoints(-50);
							can.animate({top: -3940},2000,function(){
								can.animate({left: -1250},2000,function(){
									first();
								});
							});
						});
					});
				}
			});
		};
		first();
	});
}

function lvl2 (){
	can.css({top:-4500,left:0});
	// paint maze
	ctx.fillStyle = outside;
	ctx.clearRect(0, 0, can.width(), can.height());
	ctx.fillRect(0, 0, can.width(), can.height());
	ctx.fillStyle = inside;
	ctx.fillRect(  75, 2000,  300, 3000); // v
	ctx.fillRect( 300, 3000,  750,  300); // h
	ctx.fillRect(1050, 3000,  300, 1700);
	ctx.fillRect( 300, 2000,  400,  300);
	ctx.fillRect( 500, 2000,  300,  750);
	ctx.fillRect( 500, 2500, 2400,  300);
	ctx.fillRect(1800, 2500,  300, 1000);
	ctx.fillRect(2800, 1800,  300, 2500);
	ctx.fillRect(2800, 4000, 1800,  300);
	ctx.fillRect(4400, 4000,  300,  750);
	ctx.fillRect(3900, 2500,  300, 1600);
	ctx.fillRect(3900, 2500,  900,  300);
	ctx.fillRect(4500, 1000,  300, 1600);
	ctx.fillRect(3700, 1000,  900,  300);
	ctx.fillRect(3700,  100,  300, 2000);
	ctx.fillRect(2400,  100, 1500,  300);
	ctx.fillRect(2300,  100,  300, 1000);
	ctx.fillRect(1000, 1000, 1600,  300);
	ctx.fillRect(2000, 1000,  300,  900);
	ctx.fillRect(1000, 1900, 1300,  300);
	ctx.fillRect(1000,   50,  300, 1200);
	ctx.fillRect(   0,   50, 2000,  300);

	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('level 2', 220, 4950);
	ctx.font = font;
	ctx.fillText('וְאָהַבְתָּ'/*‪*/, 215, 2950); // the seemingly empty comment contains U+202A
	ctx.fillText('כַּאֲשֶׁר'/*‪*/, 450, 3170);
	ctx.fillText('אֵת'/*‪*/, 2160, 2700);
	ctx.fillText('לְרֵעֲךָ'/*‪*/, 1950, 2900);
	ctx.fillText('יְהוָה'/*‪*/, 2935, 2890);
	ctx.fillText('אֱלֹהֶיךָ'/*‪*/, 2935, 2550);
	ctx.fillText('אֱלֹהֶיךָ'/*‪*/, 4050, 4000);
	ctx.fillText('הַאֱלֹהִים'/*‪*/, 4230, 4190);
	ctx.save();
	ctx.translate(3770, 1040);
	ctx.rotate(Math.PI/3.7);
	ctx.fillText('בְּכָל-לְבָבְךָ'/*‪*/, 100, -50);
	ctx.restore();
	ctx.fillText('וּבְכָל'/*‪*/, 3825, 1270);ctx.fillText('לְבָבְךָ'/*‪*/, 3830, 1375);
	ctx.fillText('וּבְכָל-נַפְשְׁךָ'/*‪*/, 1825, 1180);
	ctx.save();
	ctx.translate(1820, 1100);
	ctx.rotate(-Math.PI/3);
	ctx.fillText('בְּכָל-נַפְשְׁךָ'/*‪*/, 50, 400);
	ctx.restore();
	ctx.save();
	ctx.translate(915, 140);
	ctx.rotate(Math.PI/3);
	ctx.fillText('וּבְכָל-מְאֹדֶךָ'/*‪*/, 150, -10);
	ctx.restore();
	ctx.save();
	ctx.translate(1405, 140);
	ctx.rotate(-Math.PI/3);
	ctx.fillText('בְּכָל-מַמוֹֹמֶךָ'/*‪*/, -150, -10);
	ctx.restore();

	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	can.animate({top: -2860},2000,function(){
		function first(){
			$(document).on('keypress',function(e){
				if (e.which < 97) {e.which += 32}
				if (e.which == 117 || e.which == 1493) { // ו
					$(document).off('keypress');
					updatePoints(50);
					can.animate({top: -1900},2000,function(){
						can.animate({left: -180},500,function(){
							can.animate({top: -2440},1300,function(){
								can.animate({left: -1550},2000,function(){
									function second(){
										$(document).on('keypress',function(e){
											if (e.which < 97) {e.which += 32}
											if (e.which == 116 || e.which == 1488) { // א
												$(document).off('keypress');
												updatePoints(50);
												can.animate({left: -2450},2000,function(){
													function third(){
														$(document).on('keypress',function(e){
															if (e.which < 97) {e.which += 32}
															if (e.which == 104 || e.which == 1497) { // י
																$(document).off('keypress');
																updatePoints(50);
																can.animate({top: -3900},2000,function(){
																	can.animate({left: -3650},2000,function(){
																		function fourth(){
																			$(document).on('keypress',function(e){
																				if (e.which < 97) {e.which += 32}
																				if (e.which == 116 || e.which == 1488) { // א
																					$(document).off('keypress');
																					updatePoints(50);
																					can.animate({top: -2380},2400,function(){
																						can.animate({left: -4210},1100,function(){
																							can.animate({top: -900},2000,function(){
																								can.animate({left: -3590},900,function(){
																									function fifth(){
																										$(document).on('keypress',function(e){
																											if (e.which < 97) {e.which += 32}
																											if (e.which == 99 || e.which == 1489) { // ב
																												$(document).off('keypress');
																												updatePoints(50);
																												can.animate({top: 0},2000,function(){
																													can.animate({left: -2120},2000,function(){
																														can.animate({top: -950},1600,function(){
																															can.animate({left: -1600},700,function(){
																																function sixth(){
																																	$(document).on('keypress',function(e){
																																		if (e.which < 97) {e.which += 32}
																																		if (e.which == 117 || e.which == 1493) { // ו
																																			$(document).off('keypress');
																																			updatePoints(50);
																																			can.animate({left: -810},2000,function(){
																																				can.animate({top: 0},2100,function(){
																																					function seventh(){
																																						$(document).on('keypress',function(e){
																																							if (e.which < 97) {e.which += 32}
																																							if (e.which == 117 || e.which == 1493) { // ו
																																								$(document).off('keypress');
																																								updatePoints(50);
																																								can.animate({left: 0},2100,function(){
																																									// we're done!
																																									clearInterval(timeUpdate);
																																									finishLvl(2,points-oldPoints,Math.floor(Date.now()/1000)-startTime,perfection);
																																								});
																																							}
																																							if (e.which == 99 || e.which == 1489) { // ב
																																								$(document).off('keypress');
																																								perfection = false;
																																								can.animate({left: -1460},1500,function(){
																																									updatePoints(-50);
																																									can.animate({left: -750},1500,function(){
																																										seventh();
																																									});
																																								});
																																							}
																																						});
																																					}
																																					seventh();
																																				});
																																			});
																																		}
																																		if (e.which == 99 || e.which == 1489) { // ב
																																			$(document).off('keypress');
																																			perfection = false;
																																			can.animate({top: -1780},1600,function(){
																																				can.animate({left: -810},1600,function(){
																																					updatePoints(-50);
																																					can.animate({left: -1600},1600,function(){
																																						can.animate({top: -950},1600,function(){
																																							sixth();
																																						});
																																					});
																																				});
																																			});
																																		}
																																	});
																																}
																																sixth();
																															});
																														});
																													});
																												});
																											}
																											if (e.which == 117 || e.which == 1493) { // ו
																												$(document).off('keypress');
																												perfection = false;
																												can.animate({top: -1750},1300,function(){
																													updatePoints(-50);
																													can.animate({top: -900},1300,function(){
																														fifth();
																													});
																												});
																											}
																										});
																									}
																									fifth();
																								});
																							});
																						});
																					});
																				}
																				if (e.which == 118 || e.which == 1492) { // ה
																					$(document).off('keypress');
																					perfection = false;
																					can.animate({left: -4100},500,function(){
																						can.animate({top: -4410},900,function(){
																							updatePoints(-50);
																							can.animate({top: -3900},900,function(){
																								can.animate({left: -3650},500,function(){
																									fourth();
																								});
																							});
																						});
																					});
																				}
																			});
																		}
																		fourth();
																	});
																});
															}
															if (e.which == 116 || e.which == 1488) { // א
																$(document).off('keypress');
																perfection = false;
																can.animate({top: -1630},1700,function(){
																	updatePoints(-50);
																	can.animate({top: -2440},1700,function(){
																		third();
																	});
																});
															}
														});
													}
													third();
												});
											}
											if (e.which == 107 || e.which == 1500) { // ל
												$(document).off('keypress');
												perfection = false;
												can.animate({top: -3180},1700,function(){
													updatePoints(-50);
													can.animate({top: -2440},1700,function(){
														second();
													});
												});
											}
										});
									}
									second();
								});
							});
						});
					});
				}
				if (e.which == 102 || e.which == 1499) { // כ
					$(document).off('keypress');
					perfection = false;
					can.animate({left: -780},1500,function(){
						can.animate({top: -4400},2000,function(){
							updatePoints(-50);
							can.animate({top: -2860},2000,function(){
								can.animate({left: 0},1500,function(){
									first();
								});
							});
						});
					});
				}
			});
		}
		first();
	});
}

function lvl3 (){
	can.css({top:-1400,left:-2170});
	// paint maze
	ctx.fillStyle = outside;
	ctx.fillRect(0, 0, $('#world').width(), $('#world').height());
	ctx.fillStyle = inside;
	ctx.fillRect(2400, 1500,  300, 1400); // v
	ctx.fillRect(1500, 2700, 2100,  300); // h
	ctx.fillRect(3300, 2300,  300,  500);
	ctx.fillRect(2800, 2300,  800,  300);
	ctx.fillRect(2800,  100,  300, 2500);
	ctx.fillRect(1700, 1100, 1300,  300);
	ctx.fillRect(2300,  100, 1800,  300);
	ctx.fillRect(3800,  100,  300, 1400);
	ctx.fillRect(4000,  500,  900,  300);
	ctx.fillRect(4600,  800,  300, 4100);
	ctx.fillRect( 700, 3900, 3900,  300);
	ctx.fillRect(3000, 3300,  300,  700);
	ctx.fillRect(3000, 3300, 1200,  300);
	ctx.fillRect(3900, 2800,  300,  700);
	ctx.fillRect( 700, 2500,  300, 2400);
	ctx.fillRect( 200, 2500,  500,  300);
	ctx.fillRect( 200,  200,  300, 2500);
	ctx.fillRect( 200,  600, 1700,  300);

	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('level 3', 2550, 1600);
	ctx.font = font;
	ctx.fillText('וְהָיוּ'/*‪*/, 2700, 2850); // the seemingly empty comment contains U+202A
	ctx.fillText('אֵלֶּה'/*‪*/, 2400, 2850);
	ctx.save();
	ctx.translate(2950, 1100);
	ctx.rotate(-Math.PI/3);
	ctx.fillText('הַדְּבָרִים'/*‪*/, 0, 0);
	ctx.restore();
	ctx.fillText('אַחֲרֵי'/*‪*/, 2700, 1300);
	ctx.fillText('הָאֵלֶּה'/*‪*/, 3150, 250);
	ctx.fillText('אֲשֶׁר'/*‪*/, 2800, 250);
	ctx.fillText('אֲשֶׁר'/*‪*/, 4150, 680);
	ctx.save();
	ctx.translate(3970, 800);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('עַל-לְבָבֶךָ'/*‪*/, 0, 0);
	ctx.restore();
	ctx.fillText('אָנֹכִי'/*‪*/, 4550, 4080);
	ctx.fillText('תַעֲשׂוּ'/*‪*/, 4750, 4250);
	ctx.fillText('מְצַוְּךָ'/*‪*/, 2950, 4070);
	ctx.fillText('אָמַר'/*‪*/, 3150, 3900);
	ctx.save();
	ctx.translate(870, 3780);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('הַיּוֹם'/*‪*/, -100, 0);
	ctx.fillText('לַעֲשׂוֹת'/*‪*/, -380, 0);
	ctx.restore();
	ctx.fillText('עַל-לְבָבֶךָ'/*‪*/, 600, 770);
	ctx.fillText('מְתוּקִים'/*‪*/, 350, 600);

	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	can.animate({top: -2570},2000,function(){
		function first(){
			$(document).on('keypress',function(e){
				if (e.which < 97) {e.which += 32}
				if (e.which == 117 || e.which == 1493) { // ו
					$(document).off('keypress');
					updatePoints(50);
					can.animate({left: -3000},1700,function(){
						can.animate({top: -2210},400,function(){
							can.animate({left: -2580},500,function(){
								can.animate({top: -940},1800,function(){
									function second(){
										$(document).on('keypress',function(e){
											if (e.which < 97) {e.which += 32}
											if (e.which == 118 || e.which == 1492) { // ה
												$(document).off('keypress');
												updatePoints(50);
												can.animate({top: 0},1800,function(){
													function third(){
														$(document).on('keypress',function(e){
															if (e.which < 97) {e.which += 32}
															if (e.which == 118 || e.which == 1492) { // ה
																$(document).off('keypress');
																updatePoints(50);
																can.animate({left: -3540},1200,function(){
																	can.animate({top: -480},900,function(){
																		function fourth(){
																			$(document).on('keypress',function(e){
																				if (e.which < 97) {e.which += 32}
																				if (e.which == 116 || e.which == 1488) { // א
																					$(document).off('keypress');
																					updatePoints(50);
																					can.animate({left: -4250},700,function(){
																						can.animate({top: -3790},3300,function(){
																							function fifth(){
																								$(document).on('keypress',function(e){
																									if (e.which < 97 && e.which > 64) {e.which += 32}
																									if (e.which == 116 || e.which == 1488) { // א
																										$(document).off('keypress');
																										updatePoints(50);
																										can.animate({left: -2770},1800,function(){
																											function sixth(){
																												$(document).on('keypress',function(e){
																													if (e.which < 97) {e.which += 32}
																													if (e.which == 110 || e.which == 1502) { // מ
																														$(document).off('keypress');
																														updatePoints(50);
																														can.animate({left: -600},2600,function(){
																															function seventh(){
																																$(document).on('keypress',function(e){
																																	if (e.which < 97) {e.which += 32}
																																	if (e.which == 118 || e.which == 1492) { // ה
																																		$(document).off('keypress');
																																		updatePoints(50);
																																		can.animate({top: -2400},2000,function(){
																																			can.animate({left: -50},1000,function(){
																																				can.animate({top: -480},1500,function(){
																																					function eighth(){
																																						$(document).on('keypress',function(e){
																																							if (e.which < 97) {e.which += 32}
																																							if (e.which == 103 || e.which == 1506) { // ע
																																								$(document).off('keypress');
																																								updatePoints(50);
																																								can.animate({left: -1350},1800,function(){
																																									// we're done!
																																									clearInterval(timeUpdate);
																																									finishLvl(3,points-oldPoints,Math.floor(Date.now()/1000)-startTime,points-oldPoints==400);
																																								});
																																							}
																																							if (e.which == 110 || e.which == 1502) { // מ
																																								$(document).off('keypress');
																																								perfection = false;
																																								can.animate({top: 0},500,function(){
																																									updatePoints(-50);
																																									can.animate({top: -480},500,function(){
																																										eighth();
																																									});
																																								});
																																							}
																																						});
																																					}
																																					eighth();
																																				});
																																			});
																																		});
																																	}
																																	if (e.which == 107 || e.which == 1500) { // ל
																																		$(document).off('keypress');
																																		perfection = false;
																																		can.animate({top: -4500},900,function(){
																																			updatePoints(-50);
																																			can.animate({top: -3790},900,function(){
																																				seventh();
																																			});
																																		});
																																	}
																																});
																															}
																															seventh();
																														});
																													}
																													if (e.which == 116 || e.which == 1488) { // א
																														$(document).off('keypress');
																														perfection = false;
																														can.animate({top: -3200},500,function(){
																															can.animate({left: -3600},900,function(){
																																can.animate({top: -2650},900,function(){
																																	updatePoints(-50);
																																	can.animate({top: -3200},900,function(){
																																		can.animate({left: -2770},900,function(){
																																			can.animate({top: -3790},500,function(){
																																				sixth();
																																			});
																																		});
																																	});
																																});
																															});
																														});
																													}
																												});
																											}
																											sixth();
																										});
																									}
																									if (e.which == 44 || e.which == 1514) { // ת
																										$(document).off('keypress');
																										perfection = false;
																										can.animate({top: -4500},1000,function(){
																											updatePoints(-50);
																											can.animate({top: -3790},1000,function(){
																												fifth();
																											});
																										});
																									}
																								});
																							}
																							fifth();
																						});
																					});
																				}
																				if (e.which == 103 || e.which == 1506) { // ע
																					$(document).off('keypress');
																					perfection = false;
																					can.animate({top: -1170},1000,function(){
																						updatePoints(-50);
																						can.animate({top: -480},1000,function(){
																							fourth();
																						});
																					});
																				}
																			});
																		}
																		fourth();
																	});
																});
															}
															if (e.which == 116 || e.which == 1488) { // א
																$(document).off('keypress');
																perfection = false;
																can.animate({left: -2070},500,function(){
																	updatePoints(-50);
																	can.animate({left: -2580},500,function(){
																		third();
																	});
																});
															}
														});
													}
													third();
												});
											}
											if (e.which == 116 || e.which == 1488) { // א
												$(document).off('keypress');
												perfection = false;
												can.animate({left: -1530},1400,function(){
													updatePoints(-50);
													can.animate({left: -2580},1400,function(){
														second();
													});
												});
											}
										});
									}
									second();
								});
							});
						});
					});
				}
				if (e.which == 116 || e.which == 1488) { // א
					$(document).off('keypress');
					perfection = false;
					can.animate({left: -1280},1700,function(){
						updatePoints(-50);
						can.animate({left: -2170},1700,function(){
							first();
						});
					});
				}
			});
		}
		first();
	});
}

function lvl4 (){
	can.css({top:0,left:0});
	// paint maze
	ctx.fillStyle = outside;
	ctx.fillRect(0, 0, $('#world').width(), $('#world').height());
	ctx.fillStyle = inside;
	ctx.fillRect(   0,  100, 3000,  300); // h
	ctx.fillRect(1400,  200,  300, 1000); // v
	ctx.fillRect( 600,  900,  800,  300);
	ctx.fillRect(2800,  100,  300, 1900);
	ctx.fillRect(2100,  900,  800,  300);
	ctx.fillRect(3000, 1700, 1100,  300);
	ctx.fillRect(3900, 1000,  300, 2400);
	ctx.fillRect(4000, 1000,  900,  300);
	ctx.fillRect(4600,  100,  300, 4800);
	ctx.fillRect(3500,  100, 1400,  300);
	ctx.fillRect(3300, 4000, 1500,  300);
	ctx.fillRect(3300, 2800,  300, 2100);
	ctx.fillRect(2100, 2800, 1300,  300);
	ctx.fillRect(2600, 2800,  300, 1000);
	ctx.fillRect(2100, 1600,  300, 1500);
	ctx.fillRect(1500, 1600,  600,  300);
	ctx.fillRect(1500, 1600,  300, 3000);
	ctx.fillRect(1500, 4000, 1300,  300);
	ctx.fillRect( 400, 4300, 1200,  300);
	ctx.fillRect( 950, 3500,  300,  800);
	ctx.fillRect( 400, 1600,  300, 2700);
	ctx.fillRect( 400, 2600,  800,  300);
	ctx.fillRect( 900, 1600,  300, 1000);
	ctx.fillRect(   0, 1600,  500,  300);

	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('level 4', 250, 250);
	ctx.font = font;
	ctx.fillText('וְשִׁנַּנְתָּם'/*‪*/, 1750, 250); // the seemingly empty comment contains U+202A
	ctx.fillText('הִשָּׁמֶר'/*‪*/, 1550, 440);
	ctx.fillText('אֶת-הַתּוֹרָה'/*‪*/, 2660, 1050);
	ctx.fillText('לְבָנֶיךָ'/*‪*/, 2950, 1180);
	ctx.save();
	ctx.translate(4050, 1900);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('וְדִבַּרְתָּ'/*‪*/, 140, 90);
	ctx.fillText('כִּי-יִשְׁאָלְךָ'/*‪*/, -40, -40);
	ctx.restore();
	ctx.fillText('בָּם'/*‪*/, 4770, 1300);
	ctx.fillText('אֲלֵהֶם'/*‪*/, 4750, 1050);
	ctx.fillText('בְּשִׁבְתְּךָ'/*‪*/, 4500, 4180);
	ctx.fillText('אִם'/*‪*/, 4770, 4320);
	ctx.save();
	ctx.translate(3470, 4150);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('בְּבֵיתֶךָ'/*‪*/, 140, 90);
	ctx.fillText('וּבְקוּמֶךָ'/*‪*/, -60, -40);
	ctx.restore();
	ctx.fillText('וּבְלֶכְתְּךָ'/*‪*/, 2500, 2970);
	ctx.save();
	ctx.translate(2760, 3140);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('בְּלֶכְתְּךָ'/*‪*/, 0, 0);
	ctx.restore();
	ctx.fillText('בַדֶּרֶךְ'/*‪*/, 1600, 4400);
	ctx.fillText('לַעֲשׂוֹת'/*‪*/, 1800, 4200);
	ctx.fillText('וּבְשָׁכְבְּךָ'/*‪*/, 930, 4440);
	ctx.save();
	ctx.translate(1120, 4230);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('לְמַעַן'/*‪*/, 0, 0);
	ctx.restore();
	ctx.save();
	ctx.translate(600, 2630);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('וּבְקוּמֶךָ'/*‪*/, 0, 0);
	ctx.restore();
	ctx.fillText('מִּשְׁפָּטִים'/*‪*/, 800, 2760);
	
	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	can.animate({left: -1210},2000,function(){
		function first(){
			$(document).on('keypress',function(e){
				if (e.which < 97) {e.which += 32}
				if (e.which == 117 || e.which == 1493) { // ו
					$(document).off('keypress');
					updatePoints(50);
					can.animate({left: -2420},1900,function(){
						can.animate({top: -780},1900,function(){
							function second(){
								$(document).on('keypress',function(e){
									if (e.which < 97) {e.which += 32}
									if (e.which == 107 || e.which == 1500) { // ל
										$(document).off('keypress');
										updatePoints(50);
										can.animate({top: -1620},1800,function(){
											can.animate({left: -3600},1900,function(){
												function third(){
													$(document).on('keypress',function(e){
														if (e.which < 97) {e.which += 32}
														if (e.which == 117 || e.which == 1493) { // ו
															$(document).off('keypress');
															updatePoints(50);
															can.animate({top: -900},1000,function(){
																can.animate({left: -4250},1000,function(){
																	function fourth(){
																		$(document).on('keypress',function(e){
																			if (e.which < 97) {e.which += 32}
																			if (e.which == 99 || e.which == 1489) { // ב
																				$(document).off('keypress');
																				updatePoints(50);
																				can.animate({top: -3870},4000,function(){
																					function fifth(){
																						$(document).on('keypress',function(e){
																							if (e.which < 97) {e.which += 32}
																							if (e.which == 99 || e.which == 1489) { // ב
																								$(document).off('keypress');
																								updatePoints(50);
																								can.animate({left: -3200},1800,function(){
																									function sixth(){
																										$(document).on('keypress',function(e){
																											if (e.which < 97) {e.which += 32}
																											if (e.which == 99 || e.which == 1489) { // ב
																												$(document).off('keypress');
																												updatePoints(50);
																												can.animate({top: -2780},1500,function(){
																													can.animate({left: -2300},1500,function(){
																														function seventh(){
																															$(document).on('keypress',function(e){
																																if (e.which < 97) {e.which += 32}
																																if (e.which == 117 || e.which == 1493) { // ו
																																	$(document).off('keypress');
																																	updatePoints(50);
																																	can.animate({left: -1950},700,function(){
																																		can.animate({top: -1500},1800,function(){
																																			can.animate({left: -1350},700,function(){
																																				can.animate({top: -3980},2300,function(){
																																					function eighth(){
																																						$(document).on('keypress',function(e){
																																							if (e.which < 97) {e.which += 32}
																																							if (e.which == 99 || e.which == 1489) { // ב
																																								$(document).off('keypress');
																																								updatePoints(50);
																																								can.animate({top: -4120},400,function(){
																																									can.animate({left: -700},1200,function(){
																																										function ninth(){
																																											$(document).on('keypress',function(e){
																																												if (e.which < 97) {e.which += 32}
																																												if (e.which == 117 || e.which == 1493) { // ו
																																													$(document).off('keypress');
																																													updatePoints(50);
																																													can.animate({left: -250},700,function(){
																																														can.animate({top: -2450},1800,function(){
																																															function tenth(){
																																																$(document).on('keypress',function(e){
																																																	if (e.which < 97) {e.which += 32}
																																																	if (e.which == 117 || e.which == 1493) { // ו
																																																		$(document).off('keypress');
																																																		updatePoints(50);
																																																		can.animate({top: -1500},1400,function(){
																																																			can.animate({left: 0},600,function(){
																																																				// we're done!
																																																				clearInterval(timeUpdate);
																																																				finishLvl(4,points-oldPoints,Math.floor(Date.now()/1000)-startTime,perfection);
																																																			});
																																																		});
																																																	}
																																																	if (e.which == 110 || e.which == 1502) { // מ
																																																		$(document).off('keypress');
																																																		perfection = false;
																																																		can.animate({left: -600},600,function(){
																																																			can.animate({top: -1500},1400,function(){
																																																				updatePoints(-50);
																																																				can.animate({top: -2450},1400,function(){
																																																					can.animate({left: -250},600,function(){
																																																						tenth();
																																																					});
																																																				});
																																																			});
																																																		});
																																																	}
																																																});
																																															}
																																															tenth();
																																														});
																																													});
																																												}
																																												if (e.which == 107 || e.which == 1500) { // ל
																																													$(document).off('keypress');
																																													perfection = false;
																																													can.animate({top: -3300},1200,function(){
																																														updatePoints(-50);
																																														can.animate({top: -4120},1200,function(){
																																															ninth();
																																														});
																																													});
																																												}
																																											});
																																										}
																																										ninth();
																																									});
																																								});
																																							}
																																							if (e.which == 107 || e.which == 1500) { // ל
																																								$(document).off('keypress');
																																								perfection = false;
																																								can.animate({left: -2300},1200,function(){
																																									updatePoints(-50);
																																									can.animate({left: -1350},1200,function(){
																																										eighth();
																																									});
																																								});
																																							}
																																						});
																																					}
																																					eighth();
																																				});
																																			});
																																		});
																																	});
																																}
																																if (e.which == 99 || e.which == 1489) { // ב
																																	$(document).off('keypress');
																																	perfection = false;
																																	can.animate({top: -3500},1000,function(){
																																		updatePoints(-50);
																																		can.animate({top: -2780},1000,function(){
																																			seventh();
																																		});
																																	});
																																}
																															});
																														}
																														seventh();
																													});
																												});
																											}
																											if (e.which == 117 || e.which == 1493) { // ו
																												$(document).off('keypress');
																												perfection = false;
																												can.animate({top: -4500},800,function(){
																													updatePoints(-50);
																													can.animate({top: -3870},800,function(){
																														sixth();
																													});
																												});
																											}
																										});
																									}
																									sixth();
																								});
																							}
																							if (e.which == 116 || e.which == 1488) { // א
																								$(document).off('keypress');
																								perfection = false;
																								can.animate({top: -4500},900,function(){
																									updatePoints(-50);
																									can.animate({top: -3870},900,function(){
																										fifth();
																									});
																								});
																							}
																						});
																					}
																					fifth();
																				});
																			}
																			if (e.which == 116 || e.which == 1488) { // א
																				$(document).off('keypress');
																				perfection = false;
																				can.animate({top: 0},1000,function(){
																					can.animate({left: -3250},1100,function(){
																						updatePoints(-50);
																						can.animate({left: -4250},1100,function(){
																							can.animate({top: -900},1000,function(){
																								fourth();
																							});
																						});
																					});
																				});
																			}
																		});
																	}
																	fourth();
																});
															});
														}
														if (e.which == 102 || e.which == 1499) { // כ
															$(document).off('keypress');
															perfection = false;
															can.animate({top: -3100},2000,function(){
																updatePoints(-50);
																can.animate({top: -1620},2000,function(){
																	third();
																});
															});
														}
													});
												}
												third();
											});
										});
									}
									if (e.which == 116 || e.which == 1488) { // א
										$(document).off('keypress');
										perfection = false;
										can.animate({left: -1850},1000,function(){
											updatePoints(-50);
											can.animate({left: -2420},1000,function(){
												second();
											});
										});
									}
								});
							}
							second();
						});
					});
				}
				if (e.which == 118 || e.which == 1492) { // א
					$(document).off('keypress');
					perfection = false;
					can.animate({top: -800},1700,function(){
						can.animate({left: -400},1700,function(){
							updatePoints(-50);
							can.animate({left: -1210},1700,function(){
								can.animate({top: 0},1700,function(){
									first();
								});
							});
						});
					});
				}
			});
		}
		first();
	});
}

function lvl5 (){
	can.css({top:0,left:0});
	// paint maze
	ctx.fillStyle = outside;
	ctx.fillRect(0, 0, $('#world').width(), $('#world').height());
	ctx.fillStyle = inside;
	ctx.fillRect( 100,    0,  300, 1000); // v
	ctx.fillRect( 100, 1000, 2600,  300); // h
	ctx.fillRect( 900, 1000,  300, 1100);
	ctx.fillRect( 100, 1800, 1000,  300);
	ctx.fillRect(2600, 1000,  300, 1100);
	ctx.fillRect(1500, 2000, 2500,  300);
	ctx.fillRect(1500, 2000,  300, 1000);
	ctx.fillRect( 100, 2700, 4000,  300);
	ctx.fillRect( 100, 2700,  300, 2200);
	ctx.fillRect( 100, 4600, 4800,  300);
	ctx.fillRect(2000, 3700,  300, 1000);
	ctx.fillRect( 900, 3700, 1200,  300);
	ctx.fillRect(4600,  100,  300, 4800);
	ctx.fillRect(3100, 1500, 1700,  300);
	ctx.fillRect(3100,  100, 1700,  300);
	ctx.fillRect(3100,  100,  300,  700);
	ctx.fillRect( 600,  600, 3600,  300);
	ctx.fillRect(1500,    0,  300,  700);

	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('level 5', 250, 200);
	ctx.font = font;
	ctx.fillText('וּקְשַׁרְתָּם'/*‪*/, 1300, 1180); // the seemingly empty comment contains U+202A
	ctx.fillText('תְּפִילִין'/*‪*/, 1050, 1330);
	ctx.font = welcomeFont;
	ctx.fillText('you know the subject!', 730, 1970);
	ctx.font = font;
	ctx.fillText('לְאוֹת'/*‪*/, 2550, 2150);
	ctx.fillText('עַל-יָדֶךָ'/*‪*/, 2880, 2150);
	ctx.fillText('עַל-יָדֶךָ'/*‪*/, 1450, 2900);
	ctx.fillText('בֵּין-עֵינֶיךָ'/*‪*/, 1820, 2900);
	ctx.fillText('וְהָיוּ'/*‪*/, 2300, 4770);
	ctx.fillText('כִּי'/*‪*/, 2150, 4590);
	ctx.save();
	ctx.translate(4800, 1550);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('לְטֹטָפֹת'/*‪*/, 0, 0);
	ctx.restore();
	ctx.fillText('אוֹת'/*‪*/, 4500, 1650);
	ctx.fillText('בֵּין'/*‪*/, 3120, 770);
	ctx.fillText('מֵעַל'/*‪*/, 3410, 770);
	ctx.fillText('עֵינֶיךָ'/*‪*/, 1650, 580);
	ctx.fillText('לְעֵינֶיךָ'/*‪*/, 1470, 760);
	
	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	can.animate({top: -900},2000,function(){
		can.animate({left: -750},2000,function(){
			function first(){
				$(document).on('keypress',function(e){
					if (e.which < 97 && e.which > 64) {e.which += 32}
					if (e.which == 117 || e.which == 1493) { // ו
						$(document).off('keypress');
						updatePoints(50);
						can.animate({left: -2300},2500,function(){
							can.animate({top: -1900},1800,function(){
								function second(){
									$(document).on('keypress',function(e){
										if (e.which < 97 && e.which > 64) {e.which += 32}
										if (e.which == 107 || e.which == 1500) { // ל
											$(document).off('keypress');
											updatePoints(50);
											can.animate({left: -1270},1800,function(){
												can.animate({top: -2600},1100,function(){
													function third(){
														$(document).on('keypress',function(e){
															if (e.which < 97 && e.which > 64) {e.which += 32}
															if (e.which == 103 || e.which == 1506) { // ע
																$(document).off('keypress');
																updatePoints(50);
																can.animate({left: 0},1700,function(){
																	can.animate({top: -4500},2300,function(){
																		can.animate({left: -1750},1600,function(){
																			function fourth(){
																				$(document).on('keypress',function(e){
																					if (e.which < 97 && e.which > 64) {e.which += 32}
																					if (e.which == 117 || e.which == 1493) { // ו
																						$(document).off('keypress');
																						updatePoints(50);
																						can.animate({left: -4250},2300,function(){
																							can.animate({top: -1350},2350,function(){
																								function fifth(){
																									$(document).on('keypress',function(e){
																										if (e.which < 97 && e.which > 64) {e.which += 32}
																										if (e.which == 107 || e.which == 1500) { // ל
																											$(document).off('keypress');
																											updatePoints(50);
																											can.animate({top: 0},2000,function(){
																												can.animate({left: -2950},1800,function(){
																													can.animate({top: -500},1100,function(){
																														function sixth(){
																															$(document).on('keypress',function(e){
																																if (e.which < 97 && e.which > 64) {e.which += 32}
																																if (e.which == 99 || e.which == 1489) { // ב
																																	$(document).off('keypress');
																																	updatePoints(50);
																																	can.animate({left: -1200},2100,function(){
																																		function seventh(){
																																			$(document).on('keypress',function(e){
																																				if (e.which < 97 && e.which > 64) {e.which += 32}
																																				if (e.which == 103 || e.which == 1506) { // ע
																																					$(document).off('keypress');
																																					updatePoints(50);
																																					can.animate({top: 0},1200,function(){
																																						// we're done!
																																						clearInterval(timeUpdate);
																																						finishLvl(5,points-oldPoints,Math.floor(Date.now()/1000)-startTime,perfection);
																																					});
																																				}
																																				if (e.which == 107 || e.which == 1500) { // ל
																																					$(document).off('keypress');
																																					perfection = false;
																																					can.animate({left: -450},1600,function(){
																																						updatePoints(-50);
																																						can.animate({left: -1200},1600,function(){
																																							seventh();
																																						});
																																					});
																																				}
																																			});
																																		}
																																		seventh();
																																	});
																																}
																																if (e.which == 110 || e.which == 1502) { // מ
																																	$(document).off('keypress');
																																	perfection = false;
																																	can.animate({left: -3700},1600,function(){
																																		updatePoints(-50);
																																		can.animate({left: -2950},1600,function(){
																																			sixth();
																																		});
																																	});
																																}
																															});
																														}
																														sixth();
																													});
																												});
																											});
																										}
																										if (e.which == 116 || e.which == 1488) { // א
																											$(document).off('keypress');
																											perfection = false;
																											can.animate({left: -2900},1600,function(){
																												updatePoints(-50);
																												can.animate({left: -4250},1600,function(){
																													fifth();
																												});
																											});
																										}
																									});
																								}
																								fifth();
																							});
																						});
																					}
																					if (e.which == 102 || e.which == 1499) { // כ
																						$(document).off('keypress');
																						perfection = false;
																						can.animate({top: -3600},1500,function(){
																							can.animate({left: -750},1500,function(){
																								updatePoints(-50);
																								can.animate({left: -1750},1500,function(){
																									can.animate({top: -4500},1500,function(){
																										fourth();
																									});
																								});
																							});
																						});
																					}
																				});
																			}
																			fourth();
																		});
																	});
																});
															}
															if (e.which == 99 || e.which == 1489) { // ב
																$(document).off('keypress');
																perfection = false;
																can.animate({left: -3600},2100,function(){
																	updatePoints(-50);
																	can.animate({left: -1270},2100,function(){
																		third();
																	});
																});
															}
														});
													}
													third();
												});
											});
										}
										if (e.which == 103 || e.which == 1506) { // ע
											$(document).off('keypress');
											perfection = false;
											can.animate({left: -3500},1300,function(){
												updatePoints(-50);
												can.animate({left: -2350},1300,function(){
													second();
												});
											});
										}
									});
								}
								second();
							});
						});
					}
					if (e.which == 44 || e.which == 1514) { // ת
						$(document).off('keypress');
						perfection = false;
						can.animate({top: -1700},1800,function(){
							can.animate({left: -350},1100,function(){
								updatePoints(100);
								can.animate({left: -0},600,function(){
									updatePoints(-50);
									can.animate({left: -750},1700,function(){
										can.animate({top: -900},1800,function(){
											first();
										});
									});
								});
							});
						});
					}
				});
			}
			first();
		});
	});
}

function lvl6 (){
	can.css({top:0,left:-2070});
	// paint maze
	ctx.fillStyle = outside;
	ctx.fillRect(0, 0, $('#world').width(), $('#world').height());
	ctx.fillStyle = inside;
	ctx.fillRect(2300,    0,  300, 3500); // v
	ctx.fillRect(1200, 2000, 3300,  300); // h
	ctx.fillRect(4500, 1000,  300, 3100);
	ctx.fillRect( 500, 4100, 4300,  300);
	ctx.fillRect(1900, 2400,  300, 1700);
	ctx.fillRect(1200, 2400,  800,  300);
	ctx.fillRect( 500, 1000,  300, 3300);
	ctx.fillRect( 100, 1000, 2000,  300);
	ctx.fillRect( 100,  100,  300,  900);
	ctx.fillRect(1800,    0,  300, 1000);

	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('level 6', 2450, 200);
	ctx.font = font;
	ctx.fillText('וּכְתַבְתָּם'/*‪*/, 2650, 2200); // the seemingly empty comment contains U+202A
	ctx.fillText('כַּתַבְתָּם'/*‪*/, 2300, 2200);
	ctx.fillText('לֹא'/*‪*/, 2430, 2350);
	ctx.save();
	ctx.translate(4690, 2280);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('עַל-מְזֻזוֹת'/*‪*/, 0, 0);
	ctx.restore();
	ctx.fillText('לְאוֹת'/*‪*/, 4650, 2060);
	ctx.fillText('בֵּיתֶךָ'/*‪*/, 1880, 4270);
	ctx.fillText('דְּלָתְךָ'/*‪*/, 2060, 4110);
	ctx.fillText('וּבִשְׁעָרֶיךָ'/*‪*/, 900, 1150);
	ctx.fillText('לְמַעַן'/*‪*/, 500, 1150);
	
	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	can.animate({top: -1950},2800,function(){
		function first(){
			$(document).on('keypress',function(e){
				if (e.which < 97 && e.which > 64) {e.which += 32}
				if (e.which == 117 || e.which == 1493) { // ו
					$(document).off('keypress');
					updatePoints(50);
					can.animate({left: -4250},2300,function(){
						function second(){
							$(document).on('keypress',function(e){
								if (e.which < 97 && e.which > 64) {e.which += 32}
								if (e.which == 103 || e.which == 1506) { // ע
									$(document).off('keypress');
									updatePoints(50);
									can.animate({top: -4000},2300,function(){
										can.animate({left: -1700},2700,function(){
											function third(){
												$(document).on('keypress',function(e){
													if (e.which < 97 && e.which > 64) {e.which += 32}
													if (e.which == 99 || e.which == 1489) { // ב
														$(document).off('keypress');
														updatePoints(50);
														can.animate({left: -350},1800,function(){
															can.animate({top: -950},2300,function(){
																function fourth(){
																	$(document).on('keypress',function(e){
																		if (e.which < 97 && e.which > 64) {e.which += 32}
																		if (e.which == 117 || e.which == 1493) { // ו
																			$(document).off('keypress');
																			updatePoints(50);
																			can.animate({left: -1700},1800,function(){
																				can.animate({top: 0},1500,function(){
																					// we're done!
																					clearInterval(timeUpdate);
																					finishLvl(6,points-oldPoints,Math.floor(Date.now()/1000)-startTime,perfection);
																				});
																			});
																		}
																		if (e.which == 107 || e.which == 1500) { // ל
																			$(document).off('keypress');
																			perfection = false;
																			can.animate({left: 0},500,function(){
																				can.animate({top: 0},1000,function(){
																					updatePoints(-50);
																					can.animate({top: -950},1000,function(){
																						can.animate({left: -350},500,function(){
																							fourth();
																						});
																					});
																				});
																			});
																		}
																	});
																}
																fourth();
															});
														});
													}
													if (e.which == 115 || e.which == 1491) { // ד
														$(document).off('keypress');
														perfection = false;
														can.animate({top: -2250},1500,function(){
															can.animate({left: -700},1500,function(){
																updatePoints(-50);
																can.animate({left: -1700},1500,function(){
																	can.animate({top: -4000},1500,function(){
																		third();
																	});
																});
															});
														});
													}
												});
											}
											third();
										});
									});
								}
								if (e.which == 107 || e.which == 1500) { // ל
									$(document).off('keypress');
									perfection = false;
									can.animate({top: -800},1500,function(){
										updatePoints(-50);
										can.animate({top: -1950},1500,function(){
											second();
										});
									});
								}
							});
						}
						second();
					});
				}
				if (e.which == 102 || e.which == 1499) { // כ
					$(document).off('keypress');
					perfection = false;
					can.animate({left: -700},1600,function(){
						updatePoints(-50);
						can.animate({left: -2070},1600,function(){
							first();
						});
					});
				}
				if (e.which == 107 || e.which == 1500) { // ל
					$(document).off('keypress');
					perfection = false;
					can.animate({top: -3200},1600,function(){
						updatePoints(-50);
						can.animate({top: -1950},1600,function(){
							first();
						});
					});
				}
			});
		}
		first();
	});
}

function lvl7 (){
	can.css({top:0,left:0});
	// paint maze
	ctx.fillStyle = outside;
	ctx.fillRect(0,  0, $('#world').width(), $('#world').height());
	ctx.fillStyle = inside;
	ctx.fillRect( 100,    0,  300, 3500); // v // start down
	ctx.fillRect( 100,  500,  800,  300); // h // first branch left
	ctx.fillRect( 100, 2300, 1500,  300); // א branch
	ctx.fillRect(1600, 2300,  300, 1800); // down
	ctx.fillRect( 600, 2800, 1000,  300); // left (fail)
	ctx.fillRect( 600, 2800,  300,  700); // down (after left fail)
	ctx.fillRect( 500, 3800, 1300,  300); // left at bottom of ת
	ctx.fillRect( 500, 3800,  300,  700); // down
	ctx.fillRect( 500, 4250, 2800,  300); // right
	ctx.fillRect(2200, 3000,  300, 1300); // up at א fail
	ctx.fillRect(3100, 2700,  300, 2200); // up/down (א choice)
	ctx.fillRect(2600, 2700, 1300,  300); // left/right (א choice)
	ctx.fillRect(2600, 2300,  300,  500); // up
	ctx.fillRect(2600, 2300, 1500,  300); // right
	ctx.fillRect(4000, 2300,  300, 1700); // down
	ctx.fillRect(3500, 3400,  500,  300); // left at מ
	ctx.fillRect(3500, 3400,  300, 1500); // down
	ctx.fillRect(3500, 4600, 1400,  300); // right
	ctx.fillRect(4600,  100,  300, 4800); // א/ה long up
	ctx.fillRect(4000, 4150,  900,  300); // left at א fail
	ctx.fillRect(3500, 1000, 1300,  300); // left at ה fail
	ctx.fillRect(2200,  100, 2700,  300); // left
	ctx.fillRect(2800,  100,  300, 1800); // down at ל
	ctx.fillRect(2200, 1700, 2100,  300); // left/right (א choice)
	ctx.fillRect(2200,  600,  300, 2300); // up/down (א choice)
	ctx.fillRect(1500,  600,  800,  300); // left
	ctx.fillRect(1750,  100,  300,  700); // up (ו fail)
	ctx.fillRect(1450,  600,  300, 1500); // down (ו)
	ctx.fillRect( 500, 1800, 1000,  300); // left
	ctx.fillRect(1000,  100,  300, 1700); // up at ב
	ctx.fillRect( 500,  100, 1150,  300); // left/right (ו choice)
	ctx.fillRect( 500,    0,  300,  200); // up at end

	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('level 7', 240, 200);
	ctx.font = font;
	ctx.fillText('וְהָיָה'/*‪*/, 250, 830); // the seemingly empty comment contains U+202A
	ctx.fillText('הַמַּלְאָךְ'/*‪*/, 400, 650);
	ctx.fillText('אִם-שָׁמֹעַ'/*‪*/, 420, 2520);
	ctx.fillText('עֵקֶב'/*‪*/, 250, 2650);
	ctx.fillText('תִּשְׁמְעוּ'/*‪*/, 1750, 3150);
	ctx.fillText('אֶל-מִצְו‍ֹתַי'/*‪*/, 1550, 3000);
	ctx.fillText('אֶל-מִצְו‍ֹתַי'/*‪*/, 2500, 4410);
	ctx.fillText('הַיּוֹם'/*‪*/, 2350, 4250);
	ctx.fillText('אֲשֶׁר'/*‪*/, 3250, 4300);
	ctx.fillText('וִידַעְתֶּם'/*‪*/, 3250, 4550);
	ctx.fillText('אָנֹכִי'/*‪*/, 3100, 2880);
	ctx.fillText('צִוִּיתִי'/*‪*/, 3450, 2880);
	ctx.fillText('מְצַוֶּה'/*‪*/, 4000, 3600);
	ctx.fillText('דִּבֶּר'/*‪*/, 4160, 3700);
	ctx.fillText('אֶתְכֶם'/*‪*/, 4750, 4200);
	ctx.fillText('בְּנֵי-יִשְׂרָאֵל'/*‪*/, 4600, 4350);
	ctx.fillText('הַיּוֹם'/*‪*/, 4750, 1000);
	ctx.fillText('לְאַהֲבָה'/*‪*/, 4550, 1150);
	ctx.fillText('לְאַהֲבָה'/*‪*/, 2950, 450);
	ctx.fillText('כִּי'/*‪*/, 2720, 280);
	ctx.fillText('אֶת-יְהוָה'/*‪*/, 2800, 1800);
	ctx.fillText('בְּכָל-לְבַבְכֶם'/*‪*/, 3100, 1950);
	ctx.fillText('אֱלֹהֵיכֶם'/*‪*/, 2360, 1780);
	ctx.fillText('וּלְעָבְדוֹ'/*‪*/, 2360, 2000);
	ctx.fillText('וּלְעָבְדוֹ'/*‪*/, 1750, 760);
	ctx.fillText('לְעוֹלָם'/*‪*/, 1900, 550);
	ctx.save();
	ctx.translate(1200, 1860);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('בְּכָל-לְבַבְכֶם'/*‪*/, 0, 0);
	ctx.restore();
	ctx.fillText('כַּאֲשֶׁר'/*‪*/, 850, 1950);
	ctx.fillText('וּבְכָל-נַפְשְׁכֶם'/*‪*/, 950, 220);
	ctx.fillText('כָּל-הַיָּמִים'/*‪*/, 1200, 350);
	
	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	can.animate({top: -450},1000,function(){
		function first(){
			$(document).on('keypress',function(e){
				if (e.which < 97 && e.which > 64) {e.which += 32}
				if (e.which == 117 || e.which == 1493) { // ו
					$(document).off('keypress');
					updatePoints(50);
					can.animate({top: -2250},1700,function(){
						function second(){
							$(document).on('keypress',function(e){
								if (e.which < 97 && e.which > 64) {e.which += 32}
								if (e.which == 116 || e.which == 1488) { // א
									$(document).off('keypress');
									updatePoints(50);
									can.animate({left: -1300},1500,function(){
										can.animate({top: -2750},800,function(){
											function third(){
												$(document).on('keypress',function(e){
													if (e.which < 97 && e.which > 64) {e.which += 32}
													if (e.which == 44 || e.which == 1514) { // ת
														$(document).off('keypress');
														updatePoints(50);
														can.animate({top: -3700},1300,function(){
															can.animate({left: -400},1000,function(){
																can.animate({top: -4150},400,function(){
																	can.animate({left: -2000},1600,function(){
																		function fourth(){
																			$(document).on('keypress',function(e){
																				if (e.which < 97 && e.which > 64) {e.which += 32}
																				if (e.which == 116 || e.which == 1488) { // א
																					$(document).off('keypress');
																					updatePoints(50);
																					can.animate({left: -2900},500,function(){
																						function fifth(){
																							$(document).on('keypress',function(e){
																								if (e.which < 97 && e.which > 64) {e.which += 32}
																								if (e.which == 116 || e.which == 1488) { // א
																									$(document).off('keypress');
																									updatePoints(50);
																									can.animate({top: -2550},1000,function(){
																										function sixth(){
																											$(document).on('keypress',function(e){
																												if (e.which < 97 && e.which > 64) {e.which += 32}
																												if (e.which == 116 || e.which == 1488) { // א
																													$(document).off('keypress');
																													updatePoints(50);
																													can.animate({left: -2500},400,function(){
																														can.animate({top: -2250},400,function(){
																															can.animate({left: -3700},1000,function(){
																																can.animate({top: -3300},1000,function(){
																																	function seventh(){
																																		$(document).on('keypress',function(e){
																																			if (e.which < 97 && e.which > 64) {e.which += 32}
																																			if (e.which == 110 || e.which == 1502) { // מ
																																				$(document).off('keypress');
																																				updatePoints(50);
																																				can.animate({left: -3350},400,function(){
																																					can.animate({top: -4500},900,function(){
																																						can.animate({left: -4250},600,function(){
																																							can.animate({top: -4050},450,function(){
																																								function eighth(){
																																									$(document).on('keypress',function(e){
																																										if (e.which < 97 && e.which > 64) {e.which += 32}
																																										if (e.which == 116 || e.which == 1488) { // א
																																											$(document).off('keypress');
																																											updatePoints(50);
																																											can.animate({top: -850},1700,function(){
																																												function ninth(){
																																													$(document).on('keypress',function(e){
																																														if (e.which < 97 && e.which > 64) {e.which += 32}
																																														if (e.which == 118 || e.which == 1492) { // ה
																																															$(document).off('keypress');
																																															updatePoints(50);
																																															can.animate({top: 0},700,function(){
																																																can.animate({left: -2600},1100,function(){
																																																	function tenth(){
																																																		$(document).on('keypress',function(e){
																																																			if (e.which < 97 && e.which > 64) {e.which += 32}
																																																			if (e.which == 107 || e.which == 1500) { // ל
																																																				$(document).off('keypress');
																																																				updatePoints(50);
																																																				can.animate({top: -1600},1200,function(){
																																																					function eleventh(){
																																																						$(document).on('keypress',function(e){
																																																							if (e.which < 97 && e.which > 64) {e.which += 32}
																																																							if (e.which == 116 || e.which == 1488) { // א
																																																								$(document).off('keypress');
																																																								updatePoints(50);
																																																								can.animate({left: -2100},500,function(){
																																																									function twelfth(){
																																																										$(document).on('keypress',function(e){
																																																											if (e.which < 97 && e.which > 64) {e.which += 32}
																																																											if (e.which == 116 || e.which == 1488) { // א
																																																												$(document).off('keypress');
																																																												updatePoints(50);
																																																												can.animate({top: -440},900,function(){
																																																													can.animate({left: -1500},400,function(){
																																																														function twelfth(){
																																																															$(document).on('keypress',function(e){
																																																																if (e.which < 97 && e.which > 64) {e.which += 32}
																																																																if (e.which == 117 || e.which == 1493) { // ו
																																																																	$(document).off('keypress');
																																																																	updatePoints(50);
																																																																	can.animate({left: -1250},500,function(){
																																																																		can.animate({top: -1620},1000,function(){
																																																																			can.animate({left: -700},400,function(){
																																																																				function thirteenth(){
																																																																					$(document).on('keypress',function(e){
																																																																						if (e.which < 97 && e.which > 64) {e.which += 32}
																																																																						if (e.which == 99 || e.which == 1489) { // ב
																																																																							$(document).off('keypress');
																																																																							updatePoints(50);
																																																																							can.animate({top: -50},1000,function(){
																																																																								function fourteenth(){
																																																																									$(document).on('keypress',function(e){
																																																																										if (e.which < 97 && e.which > 64) {e.which += 32}
																																																																										if (e.which == 117 || e.which == 1493) { // ו
																																																																											$(document).off('keypress');
																																																																											updatePoints(50);
																																																																											can.animate({left: -250},400,function(){
																																																																												can.animate({top: 0},300,function(){
																																																																													// we're done!
																																																																													clearInterval(timeUpdate);
																																																																													finishLvl(7,points-oldPoints,Math.floor(Date.now()/1000)-startTime,perfection);
																																																																												});
																																																																											});
																																																																										}
																																																																										if (e.which == 102 || e.which == 1499) { // כ
																																																																											$(document).off('keypress');
																																																																											perfection = false;
																																																																											can.animate({left: -1250},400,function(){
																																																																												updatePoints(-50);
																																																																												can.animate({left: -700},400,function(){
																																																																													fourteenth();
																																																																												});
																																																																											});
																																																																										}
																																																																									});
																																																																								}
																																																																								fourteenth();
																																																																							});
																																																																						}
																																																																						if (e.which == 102 || e.which == 1499) { // כ
																																																																							$(document).off('keypress');
																																																																							perfection = false;
																																																																							can.animate({left: -250},400,function(){
																																																																								updatePoints(-50);
																																																																								can.animate({left: -700},400,function(){
																																																																									thirteenth();
																																																																								});
																																																																							});
																																																																						}
																																																																					});
																																																																				}
																																																																				thirteenth();
																																																																			});
																																																																		});
																																																																	});
																																																																}
																																																																if (e.which == 107 || e.which == 1500) { // ל
																																																																	$(document).off('keypress');
																																																																	perfection = false;
																																																																	can.animate({top: 0},400,function(){
																																																																		updatePoints(-50);
																																																																		can.animate({top: -440},400,function(){
																																																																			twelfth();
																																																																		});
																																																																	});
																																																																}
																																																															});
																																																														}
																																																														twelfth();
																																																													});
																																																												});
																																																											}
																																																											if (e.which == 117 || e.which == 1493) { // ו
																																																												$(document).off('keypress');
																																																												perfection = false;
																																																												can.animate({top: -2700},1200,function(){
																																																													updatePoints(-50);
																																																													can.animate({top: -1600},1200,function(){
																																																														twelfth();
																																																													});
																																																												});
																																																											}
																																																										});
																																																									}
																																																									twelfth();
																																																								});
																																																							}
																																																							if (e.which == 99 || e.which == 1489) { // ב
																																																								$(document).off('keypress');
																																																								perfection = false;
																																																								can.animate({left: -4000},1000,function(){
																																																									updatePoints(-50);
																																																									can.animate({left: -2600},1000,function(){
																																																										eleventh();
																																																									});
																																																								});
																																																							}
																																																						});
																																																					}
																																																					eleventh();
																																																				});
																																																			}
																																																			if (e.which == 102 || e.which == 1499) { // כ
																																																				$(document).off('keypress');
																																																				perfection = false;
																																																				can.animate({left: -2000},600,function(){
																																																					updatePoints(-50);
																																																					can.animate({left: -2600},600,function(){
																																																						tenth();
																																																					});
																																																				});
																																																			}
																																																		});
																																																	}
																																																	tenth();
																																																});
																																															});
																																														}
																																														if (e.which == 107 || e.which == 1500) { // ל
																																															$(document).off('keypress');
																																															perfection = false;
																																															can.animate({left: -3200},900,function(){
																																																updatePoints(-50);
																																																can.animate({left: -4250},900,function(){
																																																	ninth();
																																																});
																																															});
																																														}
																																													});
																																												}
																																												ninth();
																																											});
																																										}
																																										if (e.which == 99 || e.which == 1489) { // ב
																																											$(document).off('keypress');
																																											perfection = false;
																																											can.animate({left: -3700},500,function(){
																																												updatePoints(-50);
																																												can.animate({left: -4250},500,function(){
																																													eighth();
																																												});
																																											});
																																										}
																																									});
																																								}
																																								eighth();
																																							});
																																						});
																																					});
																																				});
																																			}
																																			if (e.which == 115 || e.which == 1491) { // ד
																																				$(document).off('keypress');
																																				perfection = false;
																																				can.animate({top: -3700},400,function(){
																																					updatePoints(-50);
																																					can.animate({top: -3300},400,function(){
																																						seventh();
																																					});
																																				});
																																			}
																																		});
																																	}
																																	seventh();
																																});
																															});
																														});
																													});
																												}
																												if (e.which == 109 || e.which == 1510) { // צ
																													$(document).off('keypress');
																													perfection = false;
																													can.animate({left: -3400},500,function(){
																														updatePoints(-50);
																														can.animate({left: -2900},500,function(){
																															sixth();
																														});
																													});
																												}
																											});
																										}
																										sixth();
																									});
																								}
																								if (e.which == 117 || e.which == 1493) { // ו
																									$(document).off('keypress');
																									perfection = false;
																									can.animate({top: -4500},400,function(){
																										updatePoints(-50);
																										can.animate({top: -4150},400,function(){
																											fifth();
																										});
																									});
																								}
																							});
																						}
																						fifth();
																					});
																				}
																				if (e.which == 118 || e.which == 1492) { // ה
																					$(document).off('keypress');
																					perfection = false;
																					can.animate({top: -2700},1300,function(){
																						updatePoints(-50);
																						can.animate({top: -4150},1300,function(){
																							fourth();
																						});
																					});
																				}
																			});
																		}
																		fourth();
																	});
																});
															});
														});
													}
													if (e.which == 116 || e.which == 1488) { // א
														$(document).off('keypress');
														perfection = false;
														can.animate({left: -250},800,function(){
															can.animate({top: -3200},500,function(){
																updatePoints(-50);
																can.animate({top: -2750},500,function(){
																	can.animate({left: -1300},800,function(){
																		third();
																	});
																});
															});
														});
													}
												});
											}
											third();
										});
									});
								}
								if (e.which == 103 || e.which == 1506) { // ע
									$(document).off('keypress');
									perfection = false;
									can.animate({top: -3250},1200,function(){
										updatePoints(-50);
										can.animate({top: -2250},1200,function(){
											second();
										});
									});
								}
							});
						}
						second();
					});
				}
				if (e.which == 118 || e.which == 1492) { // ה
					$(document).off('keypress');
					perfection = false;
					can.animate({left: -350},400,function(){
						updatePoints(-50);
						can.animate({left: 0},400,function(){
							first();
						});
					});
				}
			});
		}
		first();
	});
}

function lvl8(){
	can.css({top:0,left:-2200});
	// paint maze
	ctx.fillStyle = outside;
	ctx.fillRect(0, 0, $('#world').width(), $('#world').height());
	ctx.fillStyle = inside;
	ctx.fillRect(2400,    0,  300,  500); // v // start down
	ctx.fillRect(1000,  500, 2500,  300); // h // first choice
	ctx.fillRect(1600,  500,  300,  800); // down at מ fail
	ctx.fillRect( 900,  500,  300, 1500); // down after מ
	ctx.fillRect( 100, 2000, 1900,  300); // ב choice
	ctx.fillRect( 100,  500,  300, 1500); // up at ב fail
	ctx.fillRect(2000, 2000,  300, 1500); // down after ב
	ctx.fillRect( 100, 3200, 1900,  300); // left
	ctx.fillRect( 100, 2500,  300,  700); // up after ו fail
	ctx.fillRect( 700, 3200,  300, 1700); // down at ו
	ctx.fillRect( 700, 4600, 2500,  300); // right
	ctx.fillRect(3000, 1600,  300, 3300); // up
	ctx.fillRect(3000, 3800, 1900,  300); // right at ו fail
	ctx.fillRect(2000, 1450, 2200,  300); // ו choice
	ctx.fillRect(3900, 1450,  300, 1300); // down after ו
	ctx.fillRect(3400, 2700, 1500,  300); // ד choice
	ctx.fillRect(3400, 2700,  300,  900); // down after ד fail
	ctx.fillRect(4600,  200,  300, 2600); // up after ד
	ctx.fillRect(3000, 1000, 1900,  300); // left at ו fail
	ctx.fillRect(2800,  100, 2100,  300); // left after ו
	ctx.fillRect(4000,  200,  300,  600); // down at ו failו
	ctx.fillRect(2800,    0,  300,  200); // up at end

	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('level 8', 2550, 200);
	ctx.font = font;
	ctx.fillText('וְנָתַתִּי'/*‪*/, 2350, 700); // the seemingly empty comment contains U+202A
	ctx.fillText('לְמַעַן'/*‪*/, 2700, 700);
	ctx.fillText('מְטַר-אַרְצְכֶם'/*‪*/, 1600, 700);
	ctx.fillText('בְּעִתּוֹ'/*‪*/, 1750, 900);
	ctx.fillText('בְּעִתּוֹ'/*‪*/, 1200, 2180);
	ctx.fillText('לִרְצֹנְכֶם'/*‪*/, 900, 2180);
	ctx.fillText('יוֹרֶה'/*‪*/, 850, 3580);
	ctx.fillText('חֻקֹּתָיו'/*‪*/, 600, 3400);
	ctx.fillText('וּמַלְקוֹשׁ'/*‪*/, 3150, 3850);
	ctx.fillText('מַלְקוֹשׁ'/*‪*/, 3350, 4000);
	ctx.fillText('וְאָסַפְתָּ'/*‪*/, 3350, 1620);
	ctx.fillText('לִמְטַר'/*‪*/, 3020, 1620);
	ctx.fillText('דְגָנֶךָ'/*‪*/, 4250, 2900);
	ctx.fillText('עֵשֶׂב'/*‪*/, 3900, 2900);
	ctx.fillText('וְתִירֹשְׁךָ'/*‪*/, 4750, 1050);
	ctx.fillText('הַיּוֹם'/*‪*/, 4600, 1200);
	ctx.fillText('וְיִצְהָרֶךָ'/*‪*/, 4000, 300);
	ctx.fillText('תָּמִיד'/*‪*/, 4150, 500);
	
	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	can.animate({top: -450},900,function(){
		function first(){
			$(document).on('keypress',function(e){
				if (e.which < 97 && e.which > 64) {e.which += 32}
				if (e.which == 117 || e.which == 1493) { // ו
					$(document).off('keypress');
					updatePoints(50);
					can.animate({left: -1300},1300,function(){
						function second(){
							$(document).on('keypress',function(e){
								if (e.which < 97 && e.which > 64) {e.which += 32}
								if (e.which == 110 || e.which == 1502) { // מ
									$(document).off('keypress');
									updatePoints(50);
									can.animate({left: -700},900,function(){
										can.animate({top: -1900},1500,function(){
											function third(){
												$(document).on('keypress',function(e){
													if (e.which < 97 && e.which > 64) {e.which += 32}
													if (e.which == 99 || e.which == 1489) { // ב
														$(document).off('keypress');
														updatePoints(50);
														can.animate({left: -1700},1000,function(){
															can.animate({top: -3150},1500,function(){
																can.animate({left: -350},1300,function(){
																	function fourth(){
																		$(document).on('keypress',function(e){
																			if (e.which < 97 && e.which > 64) {e.which += 32}
																			if (e.which == 104 || e.which == 1497) { // י
																				$(document).off('keypress');
																				updatePoints(50);
																				can.animate({top: -4500},1800,function(){
																					can.animate({left: -2800},2100,function(){
																						can.animate({top: -3700},1300,function(){
																							function fifth(){
																								$(document).on('keypress',function(e){
																									if (e.which < 97 && e.which > 64) {e.which += 32}
																									if (e.which == 117 || e.which == 1493) { // ו
																										$(document).off('keypress');
																										updatePoints(50);
																										can.animate({top: -1280},1800,function(){
																											function sixth(){
																												$(document).on('keypress',function(e){
																													if (e.which < 97 && e.which > 64) {e.which += 32}
																													if (e.which == 117 || e.which == 1493) { // ו
																														$(document).off('keypress');
																														updatePoints(50);
																														can.animate({left: -3700},900,function(){
																															can.animate({top: -2600},1500,function(){
																																function seventh(){
																																	$(document).on('keypress',function(e){
																																		if (e.which < 97 && e.which > 64) {e.which += 32}
																																		if (e.which == 115 || e.which == 1491) { // ד
																																			$(document).off('keypress');
																																			updatePoints(50);
																																			can.animate({left: -4250},500,function(){
																																				can.animate({top: -960},1450,function(){
																																					function eighth(){
																																						$(document).on('keypress',function(e){
																																							if (e.which < 97 && e.which > 64) {e.which += 32}
																																							if (e.which == 117 || e.which == 1493) { // ו
																																								$(document).off('keypress');
																																								updatePoints(50);
																																								can.animate({top: -50},900,function(){
																																									can.animate({left: -3800},400,function(){
																																										function ninth(){
																																											$(document).on('keypress',function(e){
																																												if (e.which < 97 && e.which > 64) {e.which += 32}
																																												if (e.which == 117 || e.which == 1493) { // ו
																																													$(document).off('keypress');
																																													updatePoints(50);
																																													can.animate({left: -2550},1000,function(){
																																														can.animate({top: 0},300,function(){
																																															// we're done!
																																															clearInterval(timeUpdate);
																																															finishLvl(8,points-oldPoints,Math.floor(Date.now()/1000)-startTime,perfection);
																																														});
																																													});
																																												}
																																												if (e.which == 44 || e.which == 1514) { // ת
																																													$(document).off('keypress');
																																													perfection = false;
																																													can.animate({top: -600},500,function(){
																																														updatePoints(-50);
																																														can.animate({top: -50},500,function(){
																																															ninth();
																																														});
																																													});
																																												}
																																											});
																																										}
																																										ninth();
																																									});
																																								});
																																							}
																																							if (e.which == 118 || e.which == 1492) { // ה
																																								$(document).off('keypress');
																																								perfection = false;
																																								can.animate({left: -2700},1200,function(){
																																									updatePoints(-50);
																																									can.animate({left: -4250},1200,function(){
																																										eighth();
																																									});
																																								});
																																							}
																																						});
																																					}
																																					eighth();
																																				});
																																			});
																																		}
																																		if (e.which == 103 || e.which == 1506) { // ע
																																			$(document).off('keypress');
																																			perfection = false;
																																			can.animate({left: -3250},400,function(){
																																				can.animate({top: -3400},900,function(){
																																					updatePoints(-50);
																																					can.animate({top: -2600},900,function(){
																																						can.animate({left: -3700},400,function(){
																																							seventh();
																																						});
																																					});
																																				});
																																			});
																																		}
																																	});
																																}
																																seventh();
																															});
																														});
																													}
																													if (e.which == 107 || e.which == 1500) { // ל
																														$(document).off('keypress');
																														perfection = false;
																														can.animate({left: -1650},900,function(){
																															updatePoints(-50);
																															can.animate({left: -2800},900,function(){
																																sixth();
																															});
																														});
																													}
																												});
																											}
																											sixth();
																										});
																									}
																									if (e.which == 110 || e.which == 1502) { // מ
																										$(document).off('keypress');
																										perfection = false;
																										can.animate({left: -4250},1600,function(){
																											updatePoints(-50);
																											can.animate({left: -2800},1600,function(){
																												fifth();
																											});
																										});
																									}
																								});
																							}
																							fifth();
																						});
																					});
																				});
																			}
																			if (e.which == 106 || e.which == 1495) { // ח
																				$(document).off('keypress');
																				perfection = false;
																				can.animate({left: 0},300,function(){
																					can.animate({top: -2300},900,function(){
																						updatePoints(-50);
																						can.animate({top: -3150},900,function(){
																							can.animate({left: -350},300,function(){
																								fourth();
																							});
																						});
																					});
																				});
																			}
																		});
																	}
																	fourth();
																});
															});
														});
													}
													if (e.which == 107 || e.which == 1500) { // ל
														$(document).off('keypress');
														perfection = false;
														can.animate({left: 0},700,function(){
															can.animate({top: -300},1700,function(){
																updatePoints(-50);
																can.animate({top: -1900},1700,function(){
																	can.animate({left: -700},700,function(){
																		third();
																	});
																});
															});
														});
													}
												});
											}
											third();
										});
									});
								}
								if (e.which == 99 || e.which == 1489) { // ב
									$(document).off('keypress');
									perfection = false;
									can.animate({top: -1000},800,function(){
										updatePoints(-50);
										can.animate({top: -450},800,function(){
											second();
										});
									});
								}
							});
						}
						second();
					});
				}
				if (e.which == 107 || e.which == 1500) { // ל
					$(document).off('keypress');
					perfection = false;
					can.animate({left: -3000},1200,function(){
						updatePoints(-50);
						can.animate({left: -2200},1200,function(){
							first();
						});
					});
				}
			});
		}
		first();
	});
}

function lvl9(){
	can.css({top:-2230,left:0});
	// paint maze
	ctx.fillStyle = outside;
	ctx.fillRect( 0, 0, $('#world').width(), $('#world').height());
	ctx.fillStyle = inside;
	ctx.fillRect(   0, 2300, 1000,  300); // h // right
	ctx.fillRect(1000, 1300,  300, 2500); // v // ו choice
	ctx.fillRect( 500, 3500,  600,  300); // left after ו
	ctx.fillRect( 500, 3500,  300, 1400); // down
	ctx.fillRect( 100, 4000,  600,  300); // left at ע fail
	ctx.fillRect( 100, 2700,  300, 1400); // up
	ctx.fillRect( 100, 2700,  800,  300); // right
	ctx.fillRect( 500, 4600, 4400,  300); // right after ע
	ctx.fillRect(3000, 3500,  300, 1400); // up at ב fail
	ctx.fillRect(1800, 3500, 1300,  300); // left
	ctx.fillRect(4600, 2100,  300, 2800); // up after ב
	ctx.fillRect(3400, 2100, 1500,  300); // left
	ctx.fillRect(3400,  100,  300, 4400); // ל choice
	ctx.fillRect( 600,  100, 4300,  300); // at the top
	ctx.fillRect(4600,  100,  300, 1900); // down at ו fail
	ctx.fillRect(1400,  100,  300, 4400); // down at ו fail to choice
	ctx.fillRect(1400, 2000, 1900,  300); // right at ו fail choice
	ctx.fillRect( 600,  100,  300, 2150); // down at last ו
	ctx.fillRect(   0, 1950,  600,  300); // left to end

	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('level 9', 250, 2450);
	ctx.font = font;
	ctx.fillText('וְנָתַתִּי'/*‪*/, 1150, 2650); // the seemingly empty comment contains U+202A
	ctx.fillText('טו'/*‪*/, 1150, 2400);
	ctx.fillText('עֵשֶׂב'/*‪*/, 650, 4350);
	ctx.fillText('מְטַר'/*‪*/, 500, 4200);
	ctx.fillText('בְּשָׂדְךָ'/*‪*/, 3300, 4750);
	ctx.fillText('וְאָכַלְתָּ'/*‪*/, 3150, 4600);
	ctx.save();
	ctx.translate(3580, 2150);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('לִבְהֶמְתֶּךָ'/*‪*/,  0,  0);
	ctx.restore();
	ctx.fillText('וְלָקַחְתָּ'/*‪*/, 3550, 2400);
	ctx.fillText('וְאָכַלְתָּ'/*‪*/, 3400, 300);
	ctx.fillText('אָכַלְתָּ'/*‪*/, 3700, 300);
	ctx.fillText('וְשָׂבָעְתָּ'/*‪*/, 1400, 300);
	ctx.fillText('הִשָּׁמְרוּ'/*‪*/, 1550, 450);
	ctx.font = welcomeFont;
	ctx.fillText('back', 1550, 2000);
	ctx.font = font;
	ctx.fillText('וְשָׂבָעְתָּ'/*‪*/, 1550, 2300);
	ctx.fillText('לָכֶם'/*‪*/, 1700, 2150);
	
	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	can.animate({left: -750},600,function(){
		function first(){
			$(document).on('keypress',function(e){
				if (e.which < 97 && e.which > 64) {e.which += 32}
				if (e.which == 117 || e.which == 1493) { // ו
					$(document).off('keypress');
					updatePoints(50);
					can.animate({top: -3400},800,function(){
						can.animate({left: -350},400,function(){
							can.animate({top: -3900},700,function(){
								function second(){
									$(document).on('keypress',function(e){
										if (e.which < 97 && e.which > 64) {e.which += 32}
										if (e.which == 103 || e.which == 1506) { // ע
											$(document).off('keypress');
											updatePoints(50);
											can.animate({top: -4500},500,function(){
												can.animate({left: -2800},1900,function(){
													function third(){
														$(document).on('keypress',function(e){
															if (e.which < 97 && e.which > 64) {e.which += 32}
															if (e.which == 99 || e.which == 1489) { // ב
																$(document).off('keypress');
																updatePoints(50);
																can.animate({left: -4250},1200,function(){
																	can.animate({top: -1950},1800,function(){
																		can.animate({left: -3200},1000,function(){
																			function fourth(){
																				$(document).on('keypress',function(e){
																					if (e.which < 97 && e.which > 64) {e.which += 32}
																					if (e.which == 107 || e.which == 1500) { // ל
																						$(document).off('keypress');
																						updatePoints(50);
																						can.animate({top: 0},1700,function(){
																							function fifth(){
																								$(document).on('keypress',function(e){
																									if (e.which < 97 && e.which > 64) {e.which += 32}
																									if (e.which == 117 || e.which == 1493) { // ו
																										$(document).off('keypress');
																										updatePoints(50);
																										can.animate({left: -1100},1500,function(){
																											function sixth(){
																												$(document).on('keypress',function(e){
																													if (e.which < 97 && e.which > 64) {e.which += 32}
																													if (e.which == 117 || e.which == 1493) { // ו
																														$(document).off('keypress');
																														updatePoints(50);
																														can.animate({left: -500},800,function(){
																															can.animate({top: -1900},1500,function(){
																																can.animate({left: 0},600,function(){
																																	// we're done!
																																	clearInterval(timeUpdate);
																																	finishLvl(9,points-oldPoints,Math.floor(Date.now()/1000)-startTime,perfection);
																																});
																															});
																														});
																													}
																													if (e.which == 118 || e.which == 1492) { // ה
																														$(document).off('keypress');
																														perfection = false;
																														can.animate({top: -1900},1500,function(){
																															updatePoints(-50);
																															function failsixth(){
																																$(document).on('keypress',function(e){
																																	if (e.which < 97 && e.which > 64) {e.which += 32}
																																	if (e.which == 98) { // b
																																		$(document).off('keypress');
																																		updatePoints(10);
																																		can.animate({top: 0},1500,function(){
																																			sixth();
																																		});
																																	}
																																	if (e.which == 117 || e.which == 1493) { // ו
																																		$(document).off('keypress');
																																		perfection = false;
																																		can.animate({top: -4200},1700,function(){
																																			updatePoints(-50);
																																			can.animate({top: -1900},1700,function(){
																																				failsixth();
																																			});
																																		});
																																	}
																																	if (e.which == 107 || e.which == 1500) { // ל
																																		$(document).off('keypress');
																																		perfection = false;
																																		can.animate({left: -2800},1200,function(){
																																			updatePoints(-50);
																																			can.animate({left: -1100},1200,function(){
																																				failsixth();
																																			});
																																		});
																																	}
																																});
																															}
																															failsixth();
																														});
																													}
																												});
																											}
																											sixth();
																										});
																									}
																									if (e.which == 116 || e.which == 1488) { // א
																										$(document).off('keypress');
																										perfection = false;
																										can.animate({left: -4250},800,function(){
																											can.animate({top: -1700},1100,function(){
																												updatePoints(-50);
																												can.animate({top: 0},1100,function(){
																													can.animate({left: -3200},800,function(){
																														fifth();
																													});
																												});
																											});
																										});
																									}
																								});
																							}
																							fifth();
																						});
																					}
																					if (e.which == 117 || e.which == 1493) { // ו
																						$(document).off('keypress');
																						perfection = false;
																						can.animate({top: -4200},1300,function(){
																							updatePoints(-50);
																							can.animate({top: -1950},1300,function(){
																								fourth();
																							});
																						});
																					}
																				});
																			}
																			fourth();
																		});
																	});
																});
															}
															if (e.which == 117 || e.which == 1493) { // ו
																$(document).off('keypress');
																perfection = false;
																can.animate({top: -3400},800,function(){
																	can.animate({left: -1600},900,function(){
																		updatePoints(-50);
																		can.animate({left: -2800},900,function(){
																			can.animate({top: -4500},800,function(){
																				third();
																			});
																		});
																	});
																});
															}
														});
													}
													third();
												});
											});
										}
										if (e.which == 110 || e.which == 1502) { // מ
											$(document).off('keypress');
											perfection = false;
											can.animate({left: 0},300,function(){
												can.animate({top: -2550},900,function(){
													can.animate({left: -400},300,function(){
														updatePoints(-50);
														can.animate({left: 0},300,function(){
															can.animate({top: -3900},900,function(){
																can.animate({left: -350},600,function(){
																	second();
																});
															});
														});
													});
												});
											});
										}
									});
								}
								second();
							});
						});
					});
				}
				if (e.which == 121 || e.which == 1496) { // ט
					$(document).off('keypress');
					perfection = false;
					can.animate({top: -1100},600,function(){
						updatePoints(-50);
						can.animate({top: -2230},600,function(){
							first();
						});
					});
				}
			});
		}
		first();
	});
}

function lvl10(){
	can.css({top:0,left:0});
	// paint maze
	ctx.fillStyle = outside;
	ctx.fillRect(0, 0, $('#world').width(), $('#world').height());
	ctx.fillStyle = inside;
	ctx.fillRect( 100,    0,  300, 3500); // v // down
	ctx.fillRect( 400, 1900, 1000,  300); // h // right at ה
	ctx.fillRect(1300,  900,  300, 1300); // up
	ctx.fillRect( 500, 1400, 1000,  300); // left at ל fail
	ctx.fillRect(1300,  800, 1000,  300); // right after ל
	ctx.fillRect(2000,  900,  300, 1700); // down
	ctx.fillRect( 500, 2300, 1800,  300); // left
	ctx.fillRect( 500, 2300,  300, 1500); // down
	ctx.fillRect( 100, 3600, 2300,  300); // פ choice
	ctx.fillRect(2200, 2700,  300, 1600); // י choice
	ctx.fillRect( 900, 2700, 1300,  300); // left at י fail
	ctx.fillRect( 100, 4000, 2300,  300); // left after י
	ctx.fillRect(1000, 4000,  300,  900); // down at ל
	ctx.fillRect(1000, 4600, 2300,  300); // right
	ctx.fillRect(3000,   50,  300, 4800); // up, then the shortcut
	ctx.fillRect(2550, 3900, 2350,  300); // ו choice
	ctx.fillRect(4600, 2100,  300, 1800); // up after ו
	ctx.fillRect(3400, 3000, 1300,  300); // left at ו
	ctx.fillRect(3400,  800,  300, 2500); // up after ו
	ctx.fillRect(3400, 1700, 1300,  300); // right at א
	ctx.fillRect(4600,  400,  300, 1600); // up after א
	ctx.fillRect( 500,  400, 4400,  300); // at the top
	ctx.fillRect(2500,  400,  300, 2200); // down at ו fail
	ctx.fillRect( 500,    0,  300, 1300); // ל choice - end
	ctx.fillRect( 500, 1000,  700,  300); // right after ל fail
	
	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('level 10', 250, 250);
	ctx.font = font;
	ctx.fillText('הִשָּׁמְרוּ'/*‪*/, 450, 2100); // the seemingly empty comment contains U+202A
	ctx.fillText('וְחָרָה'/*‪*/, 250, 2200);
	ctx.fillText('לָכֶם'/*‪*/, 1450, 1450);
	ctx.fillText('אֲשֶׁר'/*‪*/, 1300, 1600);
	ctx.fillText('פֶּן'/*‪*/, 750, 3750);
	ctx.fillText('כִּי'/*‪*/, 500, 3750);
	ctx.fillText('יִפְתֶּה'/*‪*/, 2350, 3900);
	ctx.fillText('עֲבַדְתֶּם'/*‪*/, 2350, 3600);
	ctx.fillText('לְבַבְכֶם'/*‪*/, 1150, 4300);
	ctx.fillText('מַחְשְׁבוֹתֵיכֶם'/*‪*/, 1000, 4150);
	ctx.fillText('וְסַרְתֶּם'/*‪*/, 3300, 4100);
	ctx.fillText('הִשָּׁמְרוּ'/*‪*/, 3000, 4100);
	ctx.fillText('וַעֲבַדְתֶּם'/*‪*/, 4550, 3170);
	ctx.fillText('עֲבַדְתֶּם'/*‪*/, 4750, 3050);
	ctx.fillText('אֱלֹהִים'/*‪*/, 3800, 1900);
	ctx.fillText('מַעֲשֵׂי'/*‪*/, 3550, 1750);
	ctx.save();
	ctx.font = welcomeFont;
	ctx.translate(3200, 700);
	ctx.rotate(-Math.PI/3.5);
	ctx.fillText('not here', 0, 0);
	ctx.restore();
	ctx.fillText('אֲחֵרִים'/*‪*/, 2950, 580);
	ctx.fillText('לֹא'/*‪*/, 3150, 500);
	ctx.fillText('וְהִשְׁתַּחֲוִיתֶם'/*‪*/, 2500, 600);
	ctx.fillText('אֲשֶׁר'/*‪*/, 2680, 770);
	ctx.fillText('לָהֶם'/*‪*/, 670, 470);
	ctx.fillText('בְּקֶרֶב'/*‪*/, 670, 700);

	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	function first(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 118 || e.which == 1492) { // ה
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -1000},900,function(){
					can.animate({top: -1300},500,function(){
						second();
					});
				});
			}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -3200},1600,function(){
					updatePoints(-50);
					can.animate({top: -1850},1600,function(){
						first();
					});
				});
			}
		});
	}
	function second(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -650},600,function(){
					can.animate({left: -1800},700,function(){
						can.animate({top: -2250},1600,function(){
							can.animate({left: -300},700,function(){
								can.animate({top: -3510},700,function(){
									third();
								});
							});
						});
					});
				});
			}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -300},600,function(){
					updatePoints(-50);
					can.animate({left: -1000},600,function(){
						second();
					});
				});
			}
		});
	}
	function third(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 112 || e.which == 1508) { // פ
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -1900},1300,function(){
					fourth();
				});
			}
			if (e.which == 102 || e.which == 1499) { // כ
				$(document).off('keypress');
				perfection = false;
				can.animate({left: 0},400,function(){
					updatePoints(-50);
					can.animate({left: -300},400,function(){
						third();
					});
				});
			}
		});
	}
	function fourth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 104 || e.which == 1497) { // י
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -3900},500,function(){
					can.animate({left: -700},1000,function(){
						fifth();
					});
				});
			}
			if (e.which == 103 || e.which == 1506) { // ע
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -2575},900,function(){
					can.animate({left: -700},700,function(){
						updatePoints(-50);
						can.animate({left: -1900},700,function(){
							can.animate({top: -3510},900,function(){
								fourth();
							});
						});
					});
				});
			}
		});
	}
	function fifth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -4500},600,function(){
					can.animate({left: -2750},1800,function(){
						can.animate({top: -3800},800,function(){
							sixth();
						});
					});
				});
			}
			if (e.which == 110 || e.which == 1502) { // מ
				$(document).off('keypress');
				perfection = false;
				can.animate({left: 0},700,function(){
					updatePoints(-50);
					can.animate({left: -700},700,function(){
						fifth();
					});
				});
			}
		});
	}
	function sixth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -4250},1700,function(){
					can.animate({top: -2900},1400,function(){
						seventh();
					});
				});
			}
			if (e.which == 118 || e.which == 1492) { // ה
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -2400},400,function(){
					updatePoints(-50);
					can.animate({left: -2750},400,function(){
						sixth();
					});
				});
			}
			if (e.which == 32) { // space
				$(document).off('keypress');
				e.preventDefault();
				perfection = false;
				updatePoints(300);
				ctx.fillStyle = inside;
				ctx.fillRect(3000, 1000,  300, 3000); // erase stuff written on it
				ctx.save();
				ctx.fillStyle = fontColor;
				//ctx.font = welcomeFont;
				ctx.translate(3150, 3550);
				ctx.rotate(Math.PI/2);
				ctx.fillText('וְסַרְתֶּם, וַעֲבַדְתֶּם אֱלֹהִים'/*‪*/, 0, 0);
				ctx.restore();
				can.animate({top: -350},6000,function(){
					ninth();
				});
			}
		});
	}
	function seventh(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -3200},1000,function(){
					can.animate({top: -1600},1400,function(){
						eighth();
					});
				});
			}
			if (e.which == 103 || e.which == 1506) { // ע
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -1900},900,function(){
					updatePoints(-50);
					can.animate({top: -2900},900,function(){
						seventh();
					});
				});
			}
		});
	}
	function eighth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -4250},1100,function(){
					can.animate({top: -350},1200,function(){
						can.animate({left: -2800},1900,function(){
							ninth();
						});
					});
				});
			}
			if (e.which == 110 || e.which == 1502) { // מ
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -600},900,function(){
					updatePoints(-50);
					can.animate({top: -1600},900,function(){
						eighth();
					});
				});
			}
		});
	}
	function ninth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -2200},500,function(){
					tenth();
				});
			}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				perfection = false;
				can.animate({top: 0},400,function(){
					updatePoints(-50);
					can.animate({top: -350},400,function(){
						ninth();
					});
				});
			}
			if (e.which == 110) { // n
				$(document).off('keypress');
				e.preventDefault();
				perfection = false;
				updatePoints(-200);
				ctx.fillStyle = inside;
				ctx.fillRect(3000, 1000,  300, 3000); // erase stuff written on it
				ctx.save();
				ctx.fillStyle = fontColor;
				ctx.font = welcomeFont;
				ctx.translate(3150, 1400);
				ctx.rotate(Math.PI/2);
				ctx.fillText('you\'re a bad listener!', 0, 0);
				ctx.restore();
				can.animate({top: -3800},5500,function(){
					sixth();
				});
			}
		});
	}
	function tenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -300},2200,function(){
					eleventh();
				});
			}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -2300},1900,function(){
					updatePoints(-50);
					can.animate({top: -350},1900,function(){
						tenth();
					});
				});
			}
		});
	}
	function eleventh(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: 0},2200,function(){
					// we're done!
					clearInterval(timeUpdate);
					finishLvl(10,points-oldPoints,Math.floor(Date.now()/1000)-startTime,perfection);
				});
			}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -950},500,function(){
					can.animate({left: -700},500,function(){
						updatePoints(-50);
						can.animate({left: -300},500,function(){
							can.animate({top: -350},500,function(){
								eleventh();
							});
						});
					});
				});
			}
		});
	}
	can.animate({top: -1850},2000,function(){
		first();
	});
}

function lvl11(){
	can.css({top:0,left:0});
	// paint maze
	ctx.fillStyle = outside;
	ctx.fillRect(0, 0, $('#world').width(), $('#world').height());
	ctx.fillStyle = inside;
	ctx.fillRect(   0,  100, 3000,  300); // h // right to start
	ctx.fillRect(1200,  100,  300,  800); // v // down at ו fail
	ctx.fillRect(2700,  100,  300, 1000); // down after ו
	ctx.fillRect(1600, 1000, 2300,  300); // א choice
	ctx.fillRect(1600,  500,  300,  500); // up after א fail
	ctx.fillRect(3800,  100,  300, 1200); // up after א
	ctx.fillRect(3100,  100, 1800,  300); // ב choice
	ctx.fillRect(4600,  100,  300, 2400); // down after ב
	ctx.fillRect( 800, 1400, 4100,  300); // left at ו
	ctx.fillRect(2000, 1400,  300,  700); // down at א fail
	ctx.fillRect(2000, 2000, 1000,  300); // right
	ctx.fillRect( 800,  500,  300, 1200); // up after א
	ctx.fillRect(  50,  500,  800,  300); // left
	ctx.fillRect( 400,  500,  300, 1700); // down at ו
	ctx.fillRect(  50, 1900, 1600,  300); // ו choice
	ctx.fillRect(1600, 1900,  300,  700); // down after ו
	ctx.fillRect(1600, 2400, 2900,  300); // right
	ctx.fillRect(2300, 2400,  300, 1000); // down after מ fail
	ctx.fillRect(3200, 1800,  300,  800); // up after ו fail
	ctx.fillRect(4200, 1800,  300, 2000); // ל choice
	ctx.fillRect(3600, 1800,  600,  300); // left after ל fail
	ctx.fillRect(3450, 3600, 1450,  300); // א choice
	ctx.fillRect(4600, 3600,  300, 1300); // down after א fail
	ctx.save();
	ctx.beginPath();
	ctx.translate(3450, 3900);
	ctx.rotate(-Math.PI/5);
	ctx.rect(0, 0,  300, 1100); // down-right after א
	ctx.restore();
	ctx.fill();
	ctx.fillRect(2700, 4614, 1640,  300); // א choice
	ctx.fillRect(3250, 4150,  300,  750); // up after ו fail
	ctx.fillRect(2700, 2800,  300, 2100); // up after ו
	ctx.fillRect(2700, 2800, 1400,  300); // right after מ fail
	ctx.fillRect(2300, 3500,  500,  300); // left after מ
	ctx.fillRect(2300, 3500,  300, 1400); // down
	ctx.fillRect(1800, 4000,  500,  300); // left at מ
	ctx.save();
	ctx.beginPath();
	ctx.translate(950, 2830);
	ctx.rotate(-Math.PI/6);
	ctx.rect(0, 0,  300, 1700); // up-left after מ 
	ctx.restore();
	ctx.fill();
	ctx.fillRect(1600, 2800,  300, 1100); // up at ה fail
	ctx.fillRect( 100, 2680, 1110,  300); // left after ה
	ctx.fillRect( 750, 2300,  300,  600); // up at ה fail
	ctx.fillRect( 100, 2700,  300,  800); // down after ה
	ctx.fillRect( 100, 3100,  900,  300); // right at א fail
	ctx.fillRect( 100, 3500, 1150,  300); // right
	ctx.fillRect( 950, 3500,  300, 1400); // down
	ctx.fillRect( 950, 4000,  650,  300); // right at ה fail
	ctx.fillRect( 400, 4600, 1800,  300); // נ choice
	ctx.fillRect( 600, 3900,  300,  900); // up at ל
	ctx.fillRect(  50, 3900,  700,  300); // left
	ctx.fillRect(  50, 3900,  300, 1100); // down

	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('level 11', 250, 250);
	ctx.font = font;
	ctx.fillText('וְחָרָה'/*‪*/, 1500, 250); // the seemingly empty comment contains U+202A
	ctx.fillText('לָהֶם'/*‪*/, 1350, 400);
	ctx.fillText('אַף-יְהוָה'/*‪*/, 3050, 1200);
	ctx.fillText('מְהֵרָה'/*‪*/, 2650, 1200);
	ctx.fillText('בָּכֶם'/*‪*/, 4100, 250);
	ctx.fillText('עֲלֵיכֶם'/*‪*/, 3800, 250);
	ctx.fillText('וְעָצַר'/*‪*/, 4570, 1580);
	ctx.fillText('אִם'/*‪*/, 4750, 1750);
	ctx.fillText('אֶת-הַשָּׁמַיִם'/*‪*/, 1950, 1580);
	ctx.fillText('הַשָּׁמַיִם'/*‪*/, 2150, 1700);
	ctx.save();
	ctx.translate(660, 735);
	ctx.rotate(-Math.PI/3);
	ctx.fillText('וְלֹא-יִהְיֶה'/*‪*/, 0, 0); 
	ctx.restore();
	ctx.fillText('לֹא-יִהְיֶה'/*‪*/, 425, 650);
	ctx.fillText('מָטָר'/*‪*/, 700, 2100);
	ctx.fillText('גֶּשֶׁם'/*‪*/, 450, 2100);
	ctx.fillText('וְהָאֲדָמָה'/*‪*/, 2600, 2600);
	ctx.fillText('עַל'/*‪*/, 2500, 2750);
	ctx.fillText('לֹא'/*‪*/, 3500, 2600);
	ctx.fillText('תִתֵּן'/*‪*/, 3350, 2400);
	ctx.fillText('תִתֵּן'/*‪*/, 4370, 2750);
	ctx.fillText('יִהְיֶה'/*‪*/, 4370, 2400);
	ctx.fillText('אֶת-יְבוּלָהּ'/*‪*/, 4150, 3800);
	ctx.fillText('יְבוּלָהּ'/*‪*/, 4500, 3800);
	ctx.fillText('וַאֲבַדְתֶּם'/*‪*/, 3200, 4750);
	ctx.fillText('אֲשֶׁר'/*‪*/, 3400, 4575);
	ctx.fillText('מְהֵרָה'/*‪*/, 2600, 3700);
	ctx.fillText('הָאָרֶץ'/*‪*/, 2850, 3500);
	ctx.fillText('מֵעַל'/*‪*/, 2250, 4200);
	ctx.fillText('וְלֹא'/*‪*/, 2450, 4350);
	ctx.fillText('הָאָרֶץ'/*‪*/, 1500, 3500);
	ctx.fillText('אָנֹכִי'/*‪*/, 1750, 3550);
	ctx.fillText('הַטֹּבָה'/*‪*/, 790, 2850);
	ctx.fillText('אֲשֶׁר'/*‪*/, 900, 2700);
	ctx.fillText('אֲשֶׁר'/*‪*/, 250, 3450);
	ctx.fillText('שֶנַתָּתִּי'/*‪*/, 450, 3300);
	ctx.fillText('יְהוָה'/*‪*/, 1100, 4400);
	ctx.fillText('אָנֹכִי'/*‪*/, 1250, 4200);
	ctx.fillText('נֹתֵן'/*‪*/, 900, 4750);
	ctx.fillText('הִשְׁבִּיעַ'/*‪*/, 1200, 4750);
	ctx.fillText('לָכֶם'/*‪*/, 750, 4620);
	ctx.fillText('בָּכֶם'/*‪*/, 600, 4750);

	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	function first(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(40);
				can.animate({left: -2500},1300,function(){
					can.animate({top: -900},800,function(){
						second();
					});
				});
			}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -600},500,function(){
					updatePoints(-40);
					can.animate({top: 0},500,function(){
						first();
					});
				});
			}
		});
	}
	function second(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				updatePoints(40);
				can.animate({left: -3500},1000,function(){
					can.animate({top: 0},800,function(){
						third();
					});
				});
			}
			if (e.which == 110 || e.which == 1502) { // מ
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -1400},800,function(){
					can.animate({top: -300},500,function(){
						updatePoints(-40);
						can.animate({top: -900},500,function(){
							can.animate({left: -2500},800,function(){
								second();
							});
						});
					});
				});
			}
		});
	}
	function third(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				updatePoints(40);
				can.animate({left: -4250},600,function(){
					can.animate({top: -1280},1200,function(){
						fourth();
					});
				});
			}
			if (e.which == 103 || e.which == 1506) { // ע
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -2900},500,function(){
					updatePoints(-40);
					can.animate({left: -3500},500,function(){
						third();
					});
				});
			}
		});
	}
	function fourth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(40);
				can.animate({left: -1700},2500,function(){
					fifth();
				});
			}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -2200},800,function(){
					updatePoints(-40);
					can.animate({top: -1280},800,function(){
						fourth();
					});
				});
			}
		});
	}
	function fifth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				updatePoints(40);
				can.animate({left: -600},1000,function(){
					can.animate({top: -380},800,function(){
						can.animate({left: -200},400,function(){
							sixth();
						});
					});
				});
			}
			if (e.which == 118 || e.which == 1492) { // ה
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -1950},500,function(){
					can.animate({left: -2500},800,function(){
						updatePoints(-40);
						can.animate({left: -1700},800,function(){
							can.animate({top: -1280},500,function(){
								fifth();
							});
						});
					});
				});
			}
		});
	}
	function sixth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(40);
				can.animate({top: -1820},1000,function(){
					seventh();
				});
			}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				perfection = false;
				can.animate({left: 0},400,function(){
					updatePoints(-40);
					can.animate({left: -200},400,function(){
						sixth();
					});
				});
			}
		});
	}
	function seventh(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 110 || e.which == 1502) { // מ
				$(document).off('keypress');
				updatePoints(40);
				can.animate({left: -1300},1000,function(){
					can.animate({top: -2330},700,function(){
						can.animate({left: -2100},800,function(){
							eighth();
						});
					});
				});
			}
			if (e.which == 100 || e.which == 1490) { // ג
				$(document).off('keypress');
				perfection = false;
				can.animate({left: 0},400,function(){
					updatePoints(-40);
					can.animate({left: -200},400,function(){
						seventh();
					});
				});
			}
		});
	}
	function eighth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(40);
				can.animate({left: -3000},1000,function(){
					ninth();
				});
			}
			if (e.which == 103 || e.which == 1506) { // ע
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -3100},700,function(){
					updatePoints(-40);
					can.animate({top: -2330},700,function(){
						eighth();
					});
				});
			}
		});
	}
	function ninth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				updatePoints(40);
				can.animate({left: -3900},1000,function(){
					tenth();
				});
			}
			if (e.which == 44 || e.which == 1514) { // ת
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -1600},600,function(){
					updatePoints(-40);
					can.animate({top: -2330},600,function(){
						ninth();
					});
				});
			}
		});
	}
	function tenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 44 || e.which == 1514) { // ת
				$(document).off('keypress');
				updatePoints(40);
				can.animate({top: -3500},1000,function(){
					eleventh();
				});
			}
			if (e.which == 104 || e.which == 1497) { // י
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -1650},600,function(){
					can.animate({left: -3400},600,function(){
						updatePoints(-40);
						can.animate({left: -3900},600,function(){
							can.animate({top: -2330},600,function(){
								tenth();
							});
						});
					});
				});
			}
		});
	}
	function eleventh(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				updatePoints(40);
				can.animate({left: -3200},600,function(){
					can.animate({left: -3800, top: -4500},1000,function(){
						can.animate({left: -3000},700,function(){
							twelfth();
						});
					});
				});
			}
			if (e.which == 104 || e.which == 1497) { // י
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -4250},400,function(){
					can.animate({top: -4500},600,function(){
						updatePoints(-40);
						can.animate({top: -3500},600,function(){
							can.animate({left: -3900},400,function(){
								eleventh();
							});
						});
					});
				});
			}
		});
	}
	function twelfth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(40);
				can.animate({left: -2450},500,function(){
					can.animate({top: -3400},1000,function(){
						thirteenth();
					});
				});
			}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -4000},500,function(){
					updatePoints(-40);
					can.animate({top: -4500},500,function(){
						twelfth();
					});
				});
			}
		});
	}
	function thirteenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 110 || e.which == 1502) { // מ
				$(document).off('keypress');
				updatePoints(40);
				can.animate({left: -2100},400,function(){
					can.animate({top: -3950},800,function(){
						fourteenth();
					});
				});
			}
			if (e.which == 118 || e.which == 1492) { // ה
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -2650},500,function(){
					can.animate({left: -3600},1000,function(){
						updatePoints(-40);
						can.animate({left: -2450},1000,function(){
							can.animate({top: -3400},500,function(){
								thirteenth();
							});
						});
					});
				});
			}
		});
	}
	function fourteenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 110 || e.which == 1502) { // מ
				$(document).off('keypress');
				updatePoints(40);
				can.animate({left: -1600},400,function(){
					can.animate({top: -3200, left: -1200},800,function(){
						fifteenth();
					});
				});
			}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -4500},500,function(){
					updatePoints(-40);
					can.animate({top: -3950},500,function(){
						fourteenth();
					});
				});
			}
		});
	}
	function fifteenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 118 || e.which == 1492) { // ה
				$(document).off('keypress');
				updatePoints(40);
				can.animate({top: -2600, left: -900},800,function(){
					can.animate({left: -600},400,function(){
						sixteenth();
					});
				});
			}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -2600},600,function(){
					updatePoints(-40);
					can.animate({top: -3200},600,function(){
						fifteenth();
					});
				});
			}
		});
	}
	function sixteenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 118 || e.which == 1492) { // ה
				$(document).off('keypress');
				updatePoints(40);
				can.animate({left: 0},600,function(){
					can.animate({top: -3000},800,function(){
						seventeenth();
					});
				});
			}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -2100},400,function(){
					updatePoints(-40);
					can.animate({top: -2600},400,function(){
						sixteenth();
					});
				});
			}
		});
	}
	function seventeenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				updatePoints(40);
				can.animate({top: -3450},600,function(){
					can.animate({left: -800},600,function(){
						can.animate({top: -3950},700,eighteenth);
					});
				});
			}
			if (e.which == 97 || e.which == 1513) { // ש
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -500},400,function(){
					updatePoints(-40);
					can.animate({left: 0},400,seventeenth);
				});
			}
		});
	}
	function eighteenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 104 || e.which == 1497) { // י
				$(document).off('keypress');
				updatePoints(40);
				can.animate({top: -4500},500,nineteenth);
			}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -1100},400,function(){
					updatePoints(-40);
					can.animate({left: -800},400,eighteenth);
				});
			}
		});
	}
	function nineteenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 98 || e.which == 1504) { // נ
				$(document).off('keypress');
				updatePoints(40);
				can.animate({left: -400},400,twentieth);
			}
			if (e.which == 118 || e.which == 1492) { // ה
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -1700},900,function(){
					updatePoints(-40);
					can.animate({left: -800},900,nineteenth);
				});
			}
		});
	}
	function twentieth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				updatePoints(40);
				can.animate({top: -3750},600,function(){
					can.animate({left: 0},300,function(){
						can.animate({top: -4500},600,function(){
							// we're done!
							clearInterval(timeUpdate);
							finishLvl(11,points-oldPoints,Math.floor(Date.now()/1000)-startTime,perfection);
						});
					});
				});
			}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -200},300,function(){
					updatePoints(-40);
					can.animate({left: -400},300,twentieth);
				});
			}
		});
	}
	can.animate({left: -1000},1000,function(){
		first();
	});
}

function lvl12(){
	can.css({top:0,left:0,height:4000}).height(4000).attr('height',4000); //don't know why it's not working
	// paint maze
	ctx.fillStyle = outside;
	ctx.fillRect(0,  0, $('#world').width(), $('#world').height());
	ctx.fillStyle = inside;
	ctx.fillRect( 100,    0,  300, 3900); // v // down to start
	ctx.fillRect( 100, 1000, 1000,  300); // h // right at ו fail
	ctx.fillRect( 200, 3600, 2500,  300); // right after ו
	ctx.fillRect(1000, 3000,  300,  900); // up at א fail
	ctx.fillRect(2400, 2400,  300, 1500); // up after א
	ctx.fillRect(2400, 3000, 1000,  300); // right at א
	ctx.fillRect(3400, 2000,  300, 1900); // ע choice
	ctx.fillRect(2400, 2000, 1700,  300); // ו choice
	ctx.fillRect(3800, 2000,  300, 1900); // down after ו
	ctx.fillRect(3800, 3100, 1100,  300); // right at ו
	ctx.fillRect(4600, 1000,  300, 2100); // up after ו
	ctx.fillRect(4200, 2000,  700,  300); // left at א fail
	ctx.fillRect(4200, 2000,  300, 1000); // down
	ctx.fillRect(3800, 1000, 1100,  300); // left after א
	ctx.fillRect(3800,  100,  300, 1000); // down
	ctx.fillRect(2000,  100, 2900,  300); // ל choice
	ctx.fillRect(2000,  100,  300, 2500); // down after ל
	ctx.fillRect(2000, 1600, 2500,  300); // right at ע fail
	ctx.fillRect( 500, 2600, 1800,  300); // left after ע
	ctx.fillRect(1400, 2600,  300,  900); // down at ו fail
	ctx.fillRect( 500, 1400,  300, 1400); // up for ל choice
	ctx.fillRect( 500, 2000, 1400,  300); // right at ל fail
	ctx.fillRect( 500, 1400, 1400,  300); // right after ל
	ctx.fillRect(1200,  600,  300,  800); // up at ב
	ctx.fillRect( 500,  600, 1400,  300); // ע choice
	ctx.fillRect( 500,    0,  300,  800); // up to end

	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('level 12', 250, 250);
	ctx.font = font;
	ctx.fillText('וְשַׂמְתֶּם'/*‪*/, 250, 1300); // the seemingly empty comment contains U+202A
	ctx.fillText('בְּנֵי'/*‪*/, 500, 1150);
	ctx.fillText('אֶת-דְּבָרַי'/*‪*/, 1400, 3750);
	ctx.fillText('לְאוֹת'/*‪*/, 1150, 3650);
	ctx.fillText('אֵלֶּה'/*‪*/, 2700, 3200);
	ctx.fillText('עַל'/*‪*/, 2550, 3000);
	ctx.save();
	ctx.translate(3550, 3050);
	ctx.rotate(-Math.PI/4);
	ctx.fillText('עַל-לְבַבְכֶם'/*‪*/, 0, 0);
	ctx.restore();
	ctx.fillText('בְּתוֹךְ'/*‪*/, 3550, 3300);
	ctx.fillText('וְעַל-נַפְשְׁכֶם'/*‪*/, 3750, 2200);
	ctx.fillText('מֵעַל'/*‪*/, 3400, 2200);
	ctx.fillText('וּקְשַׁרְתֶּם'/*‪*/, 4100, 3300);
	ctx.fillText('לְדַבֵּר'/*‪*/, 3950, 3500);
	ctx.fillText('אֹתָם'/*‪*/, 4750, 2050);
	ctx.fillText('לְאוֹת'/*‪*/, 4500, 2150);
	ctx.fillText('לְאוֹת'/*‪*/, 3800, 250);
	ctx.fillText('בֵּין'/*‪*/, 4100, 250);
	ctx.save();
	ctx.translate(2200, 1900);
	ctx.rotate(-Math.PI/4);
	ctx.fillText('עַל-יֶדְכֶם'/*‪*/, 0, 0);
	ctx.restore();
	ctx.fillText('יָדֶךָ'/*‪*/, 2450, 1750);
	ctx.fillText('וְהָיוּ'/*‪*/, 1400, 2750);
	ctx.fillText('בֵּין'/*‪*/, 1550, 2950);
	ctx.fillText('לְטוֹטָפֹת'/*‪*/, 650, 2000);
	ctx.fillText('אֲשֶׁר'/*‪*/, 850, 2150);
	ctx.fillText('בֵּין'/*‪*/, 1350, 1350);
	ctx.fillText('הַיּוֹם'/*‪*/, 1500, 1550);
	ctx.fillText('עֵינֵיכֶם'/*‪*/, 1200, 800);
	ctx.fillText('יֶדְכֶם'/*‪*/, 1500, 800);

	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	function first(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -3500},2000,function(){
					can.animate({left: -900},800,second);
				});
			}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -600},500,function(){
					updatePoints(-50);
					can.animate({left: 0},500,first);
				});
			}
		});
	}
	function second(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -2100},1000,function(){
					can.animate({top: -2850},800,third);
				});
			}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -2800},700,function(){
					updatePoints(-50);
					can.animate({top: -3500},700,second);
				});
			}
		});
	}
	function third(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -3250},600,fourth);
			}
			if (e.which == 103 || e.which == 1506) { // ע
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -2200},400,function(){
					updatePoints(-50);
					can.animate({top: -2850},400,third);
				});
			}
		});
	}
	function fourth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 103 || e.which == 1506) { // ע
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -1850},800,fifth);
			}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -3500},500,function(){
					updatePoints(-50);
					can.animate({top: -2850},500,fourth);
				});
			}
		});
	}
	function fifth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -3600},400,function(){
					can.animate({top: -3050},800,sixth);
				});
			}
			if (e.which == 110 || e.which == 1502) { // מ
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -2200},900,function(){
					updatePoints(-50);
					can.animate({left: -3250},900,fifth);
				});
			}
		});
	}
	function sixth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -4250},600,function(){
					can.animate({top: -1900},800,seventh);
				});
			}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -3500},500,function(){
					updatePoints(-50);
					can.animate({top: -3050},500,sixth);
				});
			}
		});
	}
	function seventh(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -900},900,function(){
					can.animate({left: -3600},500,function(){
						can.animate({top: 0},700,eighth);
					});
				});
			}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -4000},300,function(){
					can.animate({top: -2650},900,function(){
						updatePoints(-50);
						can.animate({top: -1900},900,function(){
							can.animate({left: -4250},300,seventh);
						});
					});
				});
			}
		});
	}
	function eighth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -1850},1800,function(){
					can.animate({top: -1550},1200,ninth);
				});
			}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -4250},500,function(){
					updatePoints(-50);
					can.animate({left: -3600},500,eighth);
				});
			}
		});
	}
	function ninth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 103 || e.which == 1506) { // ע
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -2500},1100,function(){
					can.animate({left: -1200},600,tenth);
				});
			}
			if (e.which == 104 || e.which == 1497) { // י
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -4000},2000,function(){
					updatePoints(-50);
					can.animate({left: -1850},2000,ninth);
				});
			}
		});
	}
	function tenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -300},1300,function(){
					can.animate({top: -1850},900,eleventh);
				});
			}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -3200},700,function(){
					updatePoints(-50);
					can.animate({top: -2500},700,tenth);
				});
			}
		});
	}
	function eleventh(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -1250},800,function(){
					can.animate({left: -1000},600,twelfth);
				});
			}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -1400},1000,function(){
					updatePoints(-50);
					can.animate({left: -300},1000,eleventh);
				});
			}
		});
	}
	function twelfth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -550},400,thirteenth);
			}
			if (e.which == 118 || e.which == 1492) { // ה
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -1400},400,function(){
					updatePoints(-50);
					can.animate({left: -1000},400,twelfth);
				});
			}
		});
	}
	function thirteenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 103 || e.which == 1506) { // ע
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -300},600,function(){
					can.animate({top: 0},600,function(){
						// we're done!
						clearInterval(timeUpdate);
						finishLvl(12,points-oldPoints,Math.floor(Date.now()/1000)-startTime,perfection);
					});
				});
			}
			if (e.which == 104 || e.which == 1497) { // י
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -1400},400,function(){
					updatePoints(-50);
					can.animate({left: -1000},400,thirteenth);
				});
			}
		});
	}
	can.animate({top: -950},1000,first);
}

function lvl13(){
	can.css({top:0,left:-2150,height:5000}).height(5000).attr('height',5000); //something has to work
	// paint maze
	ctx.fillStyle = outside;
	ctx.fillRect(0, 0, $('#world').width(), $('#world').height());
	ctx.fillStyle = inside;
	ctx.fillRect(2400,   0,  300, 1000); // v // down to start
	ctx.beginPath();
	ctx.save();
	ctx.translate(2488, 942);
	ctx.rotate(-Math.PI/4);
	ctx.rect(0, 0, 300, 1300); // down-right at ו
	ctx.restore();
	ctx.save();
	ctx.translate(2400, 730);
	ctx.rotate(Math.PI/4);
	ctx.rect(00, 00,  300, 1300); // down-right at ו
	ctx.restore();
	ctx.fill();
	ctx.fillRect( 900, 1650, 2200,  300); // h // א choice
	ctx.fillRect( 900, 1650,  300, 1200); // down after א
	ctx.fillRect( 500, 2800, 1400,  300); // א choice
	ctx.fillRect(1600, 2100,  300, 2100); // ל choice
	ctx.fillRect(1600, 4200, 2600,  300); // right after ל
	ctx.fillRect(2500, 2100,  300, 2100); // up at ב fail
	ctx.fillRect(3900, 1400,  300, 2800); // up after ב
	ctx.fillRect(3600, 1200,  800,  300); // ב choice
	ctx.fillRect(4250, 1200,  300, 1500); // down after ב fail
	ctx.save();
	ctx.beginPath();
	ctx.translate(3035, 935);
	ctx.rotate(-Math.PI/4);
	ctx.rect(0, 0,  300, 800); // up-left after ב
	ctx.restore();
	ctx.fill();
	ctx.fillRect(3035,  100,  300,  835); // up at ב
	ctx.fillRect(3100,  600, 1400,  300); // right at ב fail
	ctx.fillRect(3100,  100, 1800,  300); // right after ב
	ctx.fillRect(4600,  100,  300, 4800); // down
	ctx.fillRect(4250, 3000,  500,  300); // left at ו fail
	ctx.fillRect(4250, 3000,  300, 1500); // down after ו fail
	ctx.fillRect( 100, 4600, 4800,  300); // bottom
	ctx.fillRect(1200, 3200,  300, 1700); // up at ב fail (triangle)
	ctx.fillRect( 600, 3200,  600,  300); // left (in triangle)
	ctx.save();
	ctx.beginPath();
	ctx.translate(600, 3500);
	ctx.rotate(-Math.PI/8);
	ctx.rect(0, 0, 300, 1500); // close triangle
	ctx.restore();
	ctx.fill();
	ctx.fillRect( 100,  500,  300, 4400); // up left side
	ctx.fillRect( 100, 1200, 1405,  300); // right @ ו fail
	ctx.save();
	ctx.beginPath();
	ctx.translate(1930, 650);
	ctx.rotate(Math.PI/4);
	ctx.rect(0, 0, 300, 900); // up-right after ו fail
	ctx.restore();
	ctx.fill();
	ctx.fillRect( 100,  300, 2200,  300); // right after ו
	ctx.fillRect(1000,  300,  300,  800); // down at ו fail
	ctx.fillRect(2000,    0,  300,  500); // up to end

	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('level 13', 2550, 250);
	ctx.font = font;
	ctx.fillText('וְלִמַּדְתֶּם'/*‪*/, 2400, 950); // the seemingly empty comment contains U+202A
	ctx.fillText('לְמַעַן'/*‪*/, 2700, 950);
	ctx.fillText('אֹתָם'/*‪*/, 1550, 1800);
	ctx.fillText('בְּנֵיכֶם'/*‪*/, 1800, 1800);
	ctx.fillText('אֶת-בְּנֵיכֶם'/*‪*/, 1250, 3000);
	ctx.fillText('בְּשִׁבְתְּךָ'/*‪*/, 900, 3000);
	ctx.fillText('לְדַבֵּר'/*‪*/, 1750, 3100);
	ctx.fillText('הַיּוֹם'/*‪*/, 1750, 2850);
	ctx.fillText('בָּם'/*‪*/, 2800, 4350);
	ctx.fillText('תָּמִיד'/*‪*/, 2650, 4200);
	ctx.fillText('בְּשִׁבְתְּךָ'/*‪*/, 3850, 1400);
	ctx.fillText('וְאָהַבְתָּ'/*‪*/, 4150, 1400);
	ctx.fillText('בְּבֵיתֶךָ'/*‪*/, 3190, 650);
	ctx.fillText('וּבְלֶכְתְּךָ'/*‪*/, 3450, 800);
	ctx.save();
	ctx.translate(4800, 3250);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('וּבְלֶכְתְּךָ'/*‪*/, 0, 0);
	ctx.restore();
	ctx.fillText('אֲשֶׁר'/*‪*/, 4550, 3200);
	ctx.fillText('בַדֶּרֶךְ'/*‪*/, 1100, 4750);
	ctx.fillText('מִן-הַמִּדְבָּר'/*‪*/, 1275, 4600);
	ctx.fillText('וּבְשָׁכְבְּךָ'/*‪*/, 250, 1200);
	ctx.fillText('בֵּין'/*‪*/, 450, 1350);
	ctx.fillText('וּבִשְׁעָרֶיךָ'/*‪*/, 1400, 450);
	ctx.fillText('בְּשְׁעָרֶיךָ'/*‪*/, 1150, 650);

	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	function first(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -1550, left: -1300},1600,second);
			}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -1500, left: -3100},1500,function(){
					updatePoints(-50);
					can.animate({top:-650,left:-2150},1500,first);
				});
			}
		});
	}
	function second(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -700},1000,function(){
					can.animate({top:-2750},1000,third);
				});
			}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -2700},1500,function(){
					updatePoints(-50);
					can.animate({left:-1300},1500,second);
				});
			}
		});
	}
	function third(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -1400},600,fourth);
			}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -300},500,function(){
					updatePoints(-50);
					can.animate({left:-700},500,third);
				});
			}
		});
	}
	function fourth(){
		$(document).on('keypress',function(e){
			if (e.which < 97) {e.which += 32}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -4120},900,function(){
					can.animate({left: -2300},600,fifth);
				});
			}
			if (e.which == 118 || e.which == 1492) { // ה
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -1800},900,function(){
					updatePoints(-50);
					can.animate({top:-2750},900,fourth);
				});
			}
		});
	}
	function fifth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -3600},1600,function(){
					can.animate({top: -1100},2100,sixth);
				});
			}
			if (e.which == 44 || e.which == 1514) { // ת
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -1800},1500,function(){
					updatePoints(-50);
					can.animate({top: -4120},1500,fifth);
				});
			}
		});
	}
	function sixth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -3300},400,function(){
					can.animate({top: -700, left: -2900},1000,function(){
						can.animate({top: -500},300,seventh);
					});
				});
			}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -3900},500,function(){
					can.animate({top: -2600},1000,function(){
						updatePoints(-50);
						can.animate({top: -1100},1000,function(){
							can.animate({left: -3600},500,sixth);
						});
					});
				});
			}
		});
	}
	function seventh(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: 0},500,function(){
					can.animate({left: -4250},800,function(){
						can.animate({top: -2950},1600,eighth);
					});
				});
			}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -4000},800,function(){
					updatePoints(-50);
					can.animate({left: -2900},800,seventh);
				});
			}
		});
	}
	function eighth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -4500},1000,function(){
					can.animate({left: -900},1700,ninth);
				});
			}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -4000},300,function(){
					can.animate({top: -4200},1200,function(){
						updatePoints(-50);
						can.animate({top: -2950},1200,function(){
							can.animate({left: -4250},300,eighth);
						});
					});
				});
			}
		});
	}
	function ninth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: 0},700,function(){
					can.animate({top: -1100},3500,tenth);
				});
			}
			if (e.which == 110 || e.which == 1502) { // מ
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -3050},1100,function(){
					can.animate({left: -400},500,function(){
						can.animate({left: -900, top: -4500},1500,function(){
							updatePoints(-50);
							ninth();
						});
					});
				});
			}
		});
	}
	function tenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -200},800,function(){
					can.animate({left: -900},900,eleventh);
				});
			}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -1100},1000,function(){
					can.animate({top: -500, left: -1600},1000,function(){
						updatePoints(-50);
						can.animate({top: -1100, left: -1100},1000,function(){
							can.animate({left: 0},1000,tenth);
						});
					});
				});
			}
		});
	}
	function eleventh(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -1800},600,function(){
					can.animate({top: 0},400,function(){
					// we're done!
					clearInterval(timeUpdate);
					finishLvl(13,points-oldPoints,Math.floor(Date.now()/1000)-startTime,perfection);
				});
				});
			}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -800},600,function(){
					updatePoints(-50);
					can.animate({top: -200},600,eleventh);
				});
			}
		});
	}
	can.animate({top: -650},1000,first);
}

function lvl14(){
	can.css({top:-2000,left:-2100}).parent().css('background-color',outside);
	// paint maze
	ctx.fillStyle = outside;
	ctx.fillRect(0, 0, $('#world').width(), $('#world').height());
	ctx.fillStyle = inside;
	ctx.fillRect(2350,  200,  300, 2100); // v // up to start
	ctx.strokeStyle = inside;
	ctx.lineWidth = 300;
	ctx.beginPath();
	ctx.arc(2500, 2500, 2250, 0, (Math.PI/180)*360, true);
	ctx.stroke();
	ctx.fillRect( 200, 2350, 2100,  300); // h // right at ע fail
	ctx.fillRect(2350, 2700,  300, 2100); // up at ב fail
	ctx.fillRect(2700, 2350, 2100,  300); // left to end

	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('level 14', 2500, 2200);
	ctx.font = font;
	ctx.fillText('וּכְתַבְתָּם'/*‪*/, 2300, 250); // the seemingly empty comment contains U+202A
	ctx.save();
	ctx.translate(300, 2700);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('עַל-מְזוּזוֹת'/*‪*/, 0, 0);
	ctx.fillText('בָּם'/*‪*/, 200, 150);
	ctx.restore();
	ctx.save();
	ctx.translate(2700, 4750);
	ctx.rotate(Math.PI);
	ctx.fillText('בֵּיתֶךָ'/*‪*/, 0, 0);
	ctx.fillText('דְּלָתְךָ'/*‪*/, 200, 200);
	ctx.restore();
	ctx.fillText('וּבִשְׁעָרֶיךָ'/*‪*/, 4675, 2500);
	ctx.save();
	ctx.translate(4750, 2300);
	ctx.rotate(Math.PI/2);
	ctx.fillText('הַיּוֹם'/*‪*/, 0, 0);
	ctx.restore();

	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	function first(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(50);
				can.animate({rotate: '90deg'},5000,second);
			}
			if (e.which == 32) { // space
				$(document).off('keypress');
				perfection = false;
				updatePoints(200);
				can.animate({rotate: '-90deg'},5000,fourth)
			}
		});
	}
	function second(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 103 || e.which == 1506) { // ע
				$(document).off('keypress');
				updatePoints(50);
				can.animate({rotate: '180deg'},5000,third);
			}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				perfection = false;
				can.animate({top:-2000},2000,function(){
					updatePoints(-50);
					can.animate({top: 0},2000,second);
				})
			}
		});
	}
	function third(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				updatePoints(50);
				can.animate({rotate: '270deg'},5000,fourth);
			}
			if (e.which == 115 || e.which == 1491) { // ד
				$(document).off('keypress');
				perfection = false;
				can.animate({top:-2000},2000,function(){
					updatePoints(-50);
					can.animate({top: 0},2000,third);
				})
			}
		});
	}
	function fourth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				perfection = false;
				can.animate({top:-2000},2000,function(){
					updatePoints(50);
					// we're done!
					clearInterval(timeUpdate);
					$('#world-container').css('background-color','initial');
					finishLvl(14,points-oldPoints,Math.floor(Date.now()/1000)-startTime,perfection);
				})
			}
			if (e.which == 118 || e.which == 1492) { // ה
				$(document).off('keypress');
				updatePoints(-100);
				var whichway = parseInt(can.rotate())<0;
				can.animate({rotate: whichway?'0deg':'360deg'},5000,function(){
					can.rotate('0deg');
					first();
				});
			}
		});
	}
	can.animate({top: 0},2000,first);
}

function lvl15(){
	can.css({top:0,left:0}).rotate('0deg');
	// paint maze
	ctx.fillStyle = outside;
	ctx.fillRect(0, 0, $('#world').width(), $('#world').height());
	ctx.fillStyle = inside;
	ctx.beginPath();
	ctx.rect( 100,    0,  300, 1500); // v // down to start
	ctx.rect( 100,  800, 1200,  300); // h // right at ל
	ctx.rect(1200,  100,  300, 1500); // י choice
	ctx.rect(1200, 1600, 1500,  300); // right after י
	ctx.rect(2000, 1600,  300, 1000); // down at י fail
	ctx.rect(2700,  100,  300, 1800); // up after י
	ctx.rect(1600,  600, 1100,  300); // left at ו fail
	ctx.rect(1600,  600,  300,  900); // down
	ctx.rect(2700,  100, 2200,  300); // right at top
	ctx.rect(3900,  100,  300, 2500); // down at ב (after game)
	ctx.rect(3900, 1000, 1000,  300); // right at ע fail
	ctx.rect(3900, 2600, 1000,  300); // right after ע
	ctx.rect(4600, 1400,  300, 3500); // ה choice
	ctx.rect(3500, 4600, 1400,  300); // left at א fail
	ctx.save();
	ctx.translate(3257, 2926);
	ctx.rotate(-Math.PI/5);
	ctx.rect(0, 0, 300, 2200); // up-left at א
	ctx.restore();
	ctx.rect(2600, 2750,  900,  300); // left
	ctx.rect(2600, 2000,  300, 2300); // down
	ctx.rect(1900, 4200, 2200,  300); // נ choice
	ctx.rect(1900, 2700,  300, 2100); // ה choice
	ctx.rect(1900, 4600, 1500,  300); // right after ה fail
	ctx.rect( 100, 2700, 2100,  300); // left after ה
	ctx.rect(1600, 2000,  300, 1000); // up at ל fail
	ctx.rect( 900, 1200,  200, 1800); // up at ל fail (circle)
	ctx.rect( 500, 1200,  600,  200); // top of circle
	ctx.rect( 500, 1200,  200, 1800); // up at כ fail (circle)
	ctx.rect( 100, 2700,  300, 1800); // down after כ
	ctx.rect( 100, 3300, 1700,  300); // right at ה
	ctx.rect(1500, 3300,  300, 1600); // down
	ctx.rect( 500, 4000, 1300,  300); // left at ע fail
	ctx.rect(   0, 4600, 1800,  300); // left to end
	ctx.save();
	ctx.rotate(Math.PI*45/180);
	ctx.fill();
	ctx.restore();
	ctx.closePath();
	ctx.beginPath();
	ctx.rect(3100, 500, 700, 1700); // gameboard
	ctx.lineWidth = 8;
	ctx.stroke();
	ctx.closePath();

	// paint text
	ctx.fillStyle = fontColor;
	ctx.textAlign = "center";
	ctx.font = welcomeFont;
	ctx.fillText('level 15', 250, 250);
	ctx.font = font;
	ctx.fillText('לְמַעַן'/*‪*/, 500, 1000); // the seemingly empty comment contains U+202A
	ctx.fillText('וְהוֹרִישׁ'/*‪*/, 250, 1100);
	ctx.fillText('יִרְבּוּ'/*‪*/, 1350, 1150);
	ctx.fillText('תֶּחֶזְקוּ'/*‪*/, 1350, 900);
	ctx.fillText('יְמֵיכֶם'/*‪*/, 2350, 1750);
	ctx.fillText('בְּנֵיכֶם'/*‪*/, 2150, 1900);
	ctx.fillText('וִימֵי'/*‪*/, 2850, 650);
	ctx.fillText('עַל'/*‪*/, 2650, 780);
	ctx.fillText('בְנֵיכֶם'/*‪*/, 4050, 450);
	ctx.fillText('זַרְעֲכֶם'/*‪*/, 4250, 300);
	ctx.fillText('עַל'/*‪*/, 4070, 1300);
	ctx.fillText('הָאֲדָמָה'/*‪*/, 4250, 1150);
	ctx.fillText('הָאֲדָמָה'/*‪*/, 4750, 2900);
	ctx.fillText('כָּל'/*‪*/, 4780, 2650);
	ctx.fillText('אֲשֶׁר'/*‪*/, 4600, 4600);
	ctx.fillText('שֶנַתָּתִּי'/*‪*/, 4450, 4800);
	ctx.fillText('נִשְׁבַּע'/*‪*/, 2750, 3000);
	ctx.fillText('בֹּטֵחַ'/*‪*/, 2750, 2750);
	ctx.fillText('יְהוָה'/*‪*/, 2600, 4400);
	ctx.fillText('לָתֵת'/*‪*/, 2900, 4370);
	ctx.save();
	ctx.translate(2050, 4350);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('לַאֲבֹתֵיכֶם'/*‪*/, 0, 0);
	ctx.restore();
	ctx.fillText('אֲשֶׁר'/*‪*/, 2050, 4600);
	ctx.fillText('לָתֵת'/*‪*/, 1600, 2900);
	ctx.fillText('כִּי'/*‪*/, 1750, 2700);
	ctx.fillText('לָהֶם'/*‪*/, 900, 2900);
	ctx.fillText('אִם'/*‪*/, 1000, 2700);
	ctx.fillText('כִּימֵי'/*‪*/, 500, 2900);
	ctx.fillText('אֶת'/*‪*/, 600, 2700);
	ctx.fillText('הַשָּׁמַיִם'/*‪*/, 500, 3450);
	ctx.fillText('אֶת'/*‪*/, 250, 3650);
	ctx.save();
	ctx.translate(1750, 4250);
	ctx.rotate(-Math.PI/2);
	ctx.fillText('עַל-הָאָרֶץ'/*‪*/, 0, 0);
	ctx.restore();
	ctx.fillText('וְהָאָרֶץ'/*‪*/, 1500, 4150);

	var oldPoints = points;
	// do maze
	var startTime = Math.round(Date.now()/1000);
	var timeUpdate = setInterval(function(){
		var elapsed = Math.round(Date.now()/1000) - startTime;
		var secs = elapsed % 60;
		if (secs.toString().length == 1) {secs = '0'+secs}
		$('#time').text(Math.floor(elapsed/60)+':'+secs);
		if (elapsed < 30) {$('#time').css('color','green')}
		else if (elapsed < 45) {$('#time').css('color','darkOrange')}
		if (elapsed > 44) {$('#time').css('color','darkRed')}
	},1000);
	var perfection = true;
	function first(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -1000},800,second);
			}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -1200},500,function(){
					updatePoints(-50);
					can.animate({top: -700},500,first);
				});
			}
		});
	}
	function second(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 104 || e.which == 1497) { // י
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -1550},600,function(){
					can.animate({left: -1800},700,third);
				});
			}
			if (e.which == 44 || e.which == 1514) { // ת
				$(document).off('keypress');
				perfection = false;
				can.animate({top: 0},600,function(){
					updatePoints(-50);
					can.animate({top: -700},600,second);
				});
			}
		});
	}
	function third(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 104 || e.which == 1497) { // י
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -2500},700,function(){
					can.animate({top: -500},900,fourth);
				});
			}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -2300},700,function(){
					updatePoints(-50);
					can.animate({top: -1550},700,third);
				});
			}
		});
	}
	function fourth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: 0},500,game);
			}
			if (e.which == 103 || e.which == 1506) { // ע
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -1400},1000,function(){
					can.animate({top: -1200},800,function(){
						updatePoints(-50);
						can.animate({top: -500},800,function(){
							can.animate({left: -2500},1000,fourth);
						});
					});
				});
			}
		});
	}
	function game(){
		var play = true, current;
		can.animate({scale: 0.28, top: -1930, left: -2400},700,function(){
			$('<div id="bar-message">לְמַעַן יִרְבּוּ יְמֵיכֶם &ndash; see how high you can get <i>your</i> life!<br/>Press space to stop the bar.</div>').css({position:'absolute',top:'45%',width:'100%',textAlign:'center',font:'bold 20pt \'Spin Cycle\'',userSelect:'none',mozUserSelect:'none',webkitUserSelect:'none',color:'white'}).appendTo('body').fadeIn();
			ctx.fillStyle = inside;
			var h = Math.random(), l = Math.random();
			//console.log(h)
			//console.log(l)
			while (h<0.7) {h = Math.random();}
			while (l>0.3) {l = Math.random();}
			current = l;
			setTimeout(function(){
				$('#bar-message').fadeOut().remove();
				goUp(l,h);
			},5000);
			$(document).on('keypress',function(e){
				if (e.which == 32) { // space
					$(document).off('keypress');
					play = false;
					updatePoints(Math.round(current * 1000));
					can.animate({scale: 1, top: 0, left: -2500},700,function(){
						can.animate({left: -3700},1000,fifth);
					});
				}
			});
		});
		function goUp(lowest,highest) {if (play) {
			ctx.clearRect(3100, 500, 700, 1700);
			ctx.fillRect(3100, 2200, 700, current*(-1700));
			if (current >= highest) {
				var l = Math.random();
				//console.log(l)
				while (l>0.3) {l = Math.random()}
				setTimeout(function(){goDown(l,highest)},50);
			} else {
				var itvl = Math.round(((highest-lowest)/(highest*50))*1000)/1000;
				current += itvl;
				setTimeout(function(){goUp(lowest,highest)},50);
			}
		}}
		function goDown(lowest,highest) {if (play) {
			ctx.clearRect(3100, 500, 700, 1700);
			ctx.fillRect(3100, 2200, 700, current*(-1700));
			if (current <= lowest) {
				var h = Math.random();
				//console.log(h)
				while (h<0.7) {h = Math.random()}
				setTimeout(function(){goUp(lowest,h)},50);
			} else {
				var itvl = Math.round(((highest-lowest)/(highest*50))*1000)/1000;
				current -= itvl;
				setTimeout(function(){goDown(lowest,highest)},50);
			}
		}}
	}
	function fifth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -900},900,sixth);
			}
			if (e.which == 122 || e.which == 1494) { // ז
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -4250},500,function(){
					updatePoints(-50);
					can.animate({left: -3700},500,fifth);
				});
			}
		});
	}
	function sixth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 103 || e.which == 1506) { // ע
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -2500},1500,function(){
					can.animate({left: -4250},500,seventh);
				});
			}
			if (e.which == 118 || e.which == 1492) { // ה
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -4250},500,function(){
					updatePoints(-50);
					can.animate({left: -3700},500,sixth);
				});
			}
		});
	}
	function seventh(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 118 || e.which == 1492) { // ה
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -4500},2000,eighth);
			}
			if (e.which == 102 || e.which == 1499) { // כ
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -1200},1000,function(){
					updatePoints(-50);
					can.animate({top: -2500},1000,seventh);
				});
			}
		});
	}
	function eighth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -2600, left: -3200},1000,function(){
					can.animate({left: -2400},600,ninth);
				});
			}
			if (e.which == 97 || e.which == 1513) { // ש
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -3200},1000,function(){
					updatePoints(-50);
					can.animate({left: -4250},1000,eighth);
				});
			}
		});
	}
	function ninth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 98 || e.which == 1504) { // נ
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -4150},1700,tenth);
			}
			if (e.which == 99 || e.which == 1489) { // ב
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -1800},600,function(){
					updatePoints(-50);
					can.animate({top: -2600},600,ninth);
				});
			}
		});
	}
	function tenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 104 || e.which == 1497) { // י
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -1700},700,eleventh);
			}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -3700},1100,function(){
					updatePoints(-50);
					can.animate({left: -2400},1100,tenth);
				});
			}
		});
	}
	function eleventh(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -2600},1500,function(){
					can.animate({left: -1300},500,twelfth);
				});
			}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -4500},400,function(){
					can.animate({left: 3000},1500,function(){
						updatePoints(-50);
						can.animate({left: -1700},1500,function(){
							can.animate({top: -4150},400,eleventh);
						});
					});
				});
			}
		});
	}
	function twelfth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -700},900,thirteenth);
			}
			if (e.which == 102 || e.which == 1499) { // כ
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -1800},1000,function(){
					updatePoints(-50);
					can.animate({top: -2600},1000,twelfth);
				});
			}
		});
	}
	function thirteenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 107 || e.which == 1500) { // ל
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -200},400,fourteenth);
			}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -1000},1500,function(){
					updatePoints(-50);
					can.animate({left: -200},400,function(){
						can.animate({top: -2600},1500,fourteenth);
					});
				});
			}
		});
	}
	function fourteenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 102 || e.which == 1499) { // כ
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: 0},400,function(){
					can.animate({top: -3200},600,fifteenth);
				});
			}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -1000},1500,function(){
					updatePoints(-50);
					can.animate({left: -700},400,function(){
						can.animate({top: -2600},1500,thirteenth);
					});
				});
			}
		});
	}
	function fifteenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 118 || e.which == 1492) { // ה
				$(document).off('keypress');
				updatePoints(50);
				can.animate({left: -1300},1200,function(){
					can.animate({top: -3950},600,sixteenth);
				});
			}
			if (e.which == 116 || e.which == 1488) { // א
				$(document).off('keypress');
				perfection = false;
				can.animate({top: -4200},1000,function(){
					updatePoints(-50);
					can.animate({top: -3200},1000,fifteenth);
				});
			}
		});
	}
	function sixteenth(){
		$(document).on('keypress',function(e){
			if (e.which < 97 && e.which > 64) {e.which += 32}
			if (e.which == 103 || e.which == 1506) { // ע
				$(document).off('keypress');
				updatePoints(50);
				can.animate({top: -4500},600,function(){
					can.animate({left: 0},1200,function(){
						// we're done!
						//clearInterval(timeUpdate);
						finishLvl(15,points-oldPoints,Math.floor(Date.now()/1000)-startTime,perfection);
					});
				});
			}
			if (e.which == 117 || e.which == 1493) { // ו
				$(document).off('keypress');
				perfection = false;
				can.animate({left: -300},1000,function(){
					updatePoints(-50);
					can.animate({left: -1300},1000,sixteenth);
				});
			}
		});
	}
	can.animate({top: -700},700,first);
}

function finishLvl(lvl,origPoints,elapsedTime,perfection) {
	$('#music')[0].pause();
	ctx.fillStyle = outside;
	ctx.clearRect(0, 0, can.width(), can.height());
	ctx.fillRect(0, 0, can.width(), can.height());
	var
		posuk = $('<audio autoplay="autoplay"><source src="sounds/'+lvl+'.wav" /><source src="sounds/'+lvl+'.mp3" /></audio>'),
		psukim = [
			'שְׁמַ֖ע יִשְׂרָאֵ֑ל יְהוָ֥ה אֱלֹהֵ֖ינוּ יְהוָ֥ה ׀ אֶחָֽד׃',
			'וְאָ֣הַבְתָּ֔ אֵ֖ת יְהוָ֣ה אֱלֹהֶ֑יךָ בְּכָל־לְבָֽבְךָ֥ וּבְכָל־נַפְשְׁךָ֖ וּבְכָל־מְאֹדֶֽךָ׃',
			'וְהָי֞וּ הַדְּבָרִ֣ים הָאֵ֗לֶּה אֲשֶׁ֨ר אָֽנֹכִ֧י מְצַוְּךָ֛ הַיּ֖וֹם עַל־לְבָבֶֽךָ׃',
			'וְשִׁנַּנְתָּ֣ם לְבָנֶ֔יךָ וְדִבַּרְתָּ֖ בָּ֑ם בְּשִׁבְתְּךָ֤ בְּבֵיתֶ֨ךָ֙ וּבְלֶכְתְּךָ֣ בַדֶּ֔רֶךְ וּֽבְשָׁכְבְּךָ֖ וּבְקוּמֶֽךָ׃',
			'וּקְשַׁרְתָּ֥ם לְא֖וֹת עַל־יָדֶ֑ךָ וְהָי֥וּ לְטֹֽטָפֹ֖ת בֵּ֥ין עֵינֶֽיךָ׃',
			'וּכְתַבְתָּ֛ם עַל־מְזֻז֥וֹת בֵּיתֶ֖ךָ וּבִשְׁעָרֶֽיךָ׃',
			'וְהָיָ֗ה אִם־שָׁמֹ֤עַ תִּשְׁמְעוּ֙ אֶל־מִצְו‍ֹתַ֔י אֲשֶׁ֧ר אָֽנֹכִ֛י מְצַוֶּ֥ה אֶתְכֶ֖ם הַיּ֑וֹם לְאַֽהֲבָ֞ה אֶת־יְהוָ֤ה אֱלֹֽהֵיכֶם֙ וּלְעָבְד֔וֹ בְּכָל־לְבַבְכֶ֖ם וּבְכָל־נַפְשְׁכֶֽם׃',
			'וְנָֽתַתִּ֧י מְטַֽר־אַרְצְכֶ֛ם בְּעִתּ֖וֹ יוֹרֶ֣ה וּמַלְק֑וֹשׁ וְאָֽסַפְתָּ֣ דְגָנֶ֔ךָ וְתִֽירֹשְׁךָ֖ וְיִצְהָרֶֽךָ׃',
			'וְנָֽתַתִּ֛י עֵ֥שֶׂב בְּשָֽׂדְךָ֖ לִבְהֶמְתֶּ֑ךָ וְאָֽכַלְתָּ֖ וְשָׂבָֽעְתָּ׃',
			'הִשָּֽׁמְר֣וּ לָכֶ֔ם פֶּ֥ן יִפְתֶּ֖ה לְבַבְכֶ֑ם וְסַרְתֶּ֗ם וַֽעֲבַדְתֶּם֙ אֱלֹהִ֣ים אֲחֵרִ֔ים וְהִשְׁתַּֽחֲוִיתֶ֖ם לָהֶֽם׃',
			'וְחָרָ֨ה אַף־יְהוָ֜ה בָּכֶ֗ם וְעָצַ֤ר אֶת־הַשָּׁמַ֨יִם֙ וְלֹֽא־יִהְיֶ֣ה מָטָ֔ר וְהָ֣אֲדָמָ֔ה לֹ֥א תִתֵּ֖ן אֶת־יְבוּלָ֑הּ וַֽאֲבַדְתֶּ֣ם מְהֵרָ֗ה מֵעַל֙ הָאָ֣רֶץ הַטֹּבָ֔ה אֲשֶׁ֥ר יְהוָ֖ה נֹתֵ֥ן לָכֶֽם׃',
			'וְשַׂמְתֶּם֙ אֶת־דְּבָרַ֣י אֵ֔לֶּה עַל־לְבַבְכֶ֖ם וְעַֽל־נַפְשְׁכֶ֑ם וּקְשַׁרְתֶּ֨ם אֹתָ֤ם לְאוֹת֙ עַל־יֶדְכֶ֔ם וְהָי֥וּ לְטֽוֹטָפֹ֖ת בֵּ֥ין עֵֽינֵיכֶֽם׃',
			'וְלִמַּדְתֶּ֥ם אֹתָ֛ם אֶת־בְּנֵיכֶ֖ם לְדַבֵּ֣ר בָּ֑ם בְּשִׁבְתְּךָ֤ בְּבֵיתֶ֨ךָ֙ וּבְלֶכְתְּךָ֣ בַדֶּ֔רֶךְ וּֽבְשָׁכְבְּךָ֖ וּבְקוּמֶֽךָ׃',
			'וּכְתַבְתָּ֛ם עַל־מְזוּז֥וֹת בֵּיתֶ֖ךָ וּבִשְׁעָרֶֽיךָ׃',
			'לְמַ֨עַן יִרְבּ֤וּ יְמֵיכֶם֙ וִימֵ֣י בְנֵיכֶ֔ם עַ֚ל הָֽאֲדָמָ֔ה אֲשֶׁ֨ר נִשְׁבַּ֧ע יְהוָ֛ה לַאֲבֹֽתֵיכֶ֖ם לָתֵ֣ת לָהֶ֑ם כִּימֵ֥י הַשָּׁמַ֖יִם עַל־הָאָֽרֶץ׃'
		],
		nextLevel = [lvl2,lvl3,lvl4,lvl5,lvl6,lvl7,lvl8,lvl9,lvl10,lvl11,lvl12,lvl13,lvl14,lvl15],
		isEndOfPerek = (lvl==6 || lvl==15);
		perekTime += elapsedTime;
	
	updatePoints(100); // 100pt bonus
	if (elapsedTime < 45) { // bonus points for being quick
		setTimeout(function(){updatePoints((45 - elapsedTime) * 15)},500);
	}
	if (perfection) { // 200pt bonus if all were correct
		setTimeout(function(){updatePoints(200)},(elapsedTime<45)?1000:500);
	}
	$('<div style="height:480px"></div>').appendTo('#introduction').append(
		'<p style="font-size:xx-large;margin-top:20px">Finished level '+lvl+'</p>',
		'<p style="font-size:larger;margin-top:5px"><big style="font-size:150%">'+(origPoints+100)+' points</big> this level</p>',
		'<p style="font-size:larger">time: '+(function(){var secs=elapsedTime%60;if(secs.toString().length==1) {secs='0'+secs}return Math.floor(elapsedTime/60)+':'+secs})()+((elapsedTime<45)?' &nbsp; &nbsp; &nbsp; +'+((45 - elapsedTime) * 15)+' points':'')+'</p>',
		perfection?'<p style="font-size:larger">+200 perfection bonus</p>':'',
		'<p style="font-size:larger">total: <big>'+(origPoints+100+(elapsedTime<45?(45-elapsedTime)*15:0)+(perfection?200:0))+' points</big> this level</p>',
		'<p style="font-size:xx-large;margin-top:50px" dir="rtl">'+psukim[lvl-1]+'</p>',
		'<img src="next.png" alt="next" id="'+(isEndOfPerek?'finishPerek':'showInfo')+'" style="margin-top:100px" />'
	);
	$('#introduction>div,#world,#time,#music').hide('fast')
	$('#introduction,#introduction>div:last-child').show('fast');
	$('#introduction').on('click','#startLvl',function(){
		$('#introduction').off('click','#startLvl');
		$('#introduction').hide('fast');
		$('#world-container').css('height','500px');
		$('#world,#time,#music').show('fast');
		posuk[0].pause();
		posuk.remove();
		$('#time').text('0:00').css('color','green');
		$('#music')[0].play();
		nextLevel[lvl-1]();
	});
	$('#introduction').on('click','#showInfo',function(){
		$('#introduction').off('click','#showInfo');
		$('#introduction>div').hide('fast');
		$('.info:eq('+(lvl-1)+')').show('fast').append(lvl==15?'<div style="margin-top:25px;font-size:larger">Ready to finish up?<img src="next.png" alt="next" id="endGameBtn" style="margin-top:100px" />':'<div style="margin-top:25px;font-size:larger">Ready for level '+(lvl+1)+'?<br/><img src="start.png" alt="start" id="startLvl" /></div>');
		$('#endGameBtn').one('click',function(){
			$('#introduction>div').hide('fast');
			$('#endGame').show('fast');

			$('#mitzvahDayBtn').one('click',function(){
				$('#introduction>div').hide('fast');
				$('#mitzvahDay').show('fast');

				$('#scorePageBtn').one('click',function(){
					$('#introduction>div').hide('fast');
					$('#scorePage').show('fast');
					$('#scorePage h2 span').text(points);

					$('#highscoresBtn').one('click',function(){
						var name = $('#highscoresName').val(), id = localStorage.getItem('the-sofer-game-user-id');
						if (!id) {
							id = Math.pow((name+'-'+points).split('').map(function(){return this.toString().charCodeAt(0)}).reduce(function(a,b){return a+b}),8).toString(12);
							localStorage.setItem('the-sofer-game-user-id',id);
						}
						if (name) {
							$.post('highscores.php',{
								action: "add",
								id: id,
								name: name,
								points: points
							},showHighScoreList);
						} else {showHighScoreList()}

						function showHighScoreList(){
							$.getJSON('highscores.php',
								$.extend(
									{action: "get"},
									name?{id: id, name: name}:{}
								),
								function(highscores){
									var table = "";
									for (var i=0;i<highscores.length;i++) {
										table += "<tr"+(highscores[i].me?' class="myScore"':'')+"><td>"+highscores[i].position+"</td><td>"+highscores[i].name+"</td><td>"+highscores[i].points+"</td></tr>"
									}
									$("#highscores").html(table);
								}
							);
							$('#introduction>div').hide('fast');
							$('#highscoresPage').show('fast');
						}
					});
				});
			});
		});
	});
	$('#introduction').on('click','#finishPerek',function(){
		//console.log('#finishPerek clicked');
		$('#introduction').off('click','#finishPerek');
		updatePoints(250);
		if (perekTime < (lvl==6?240:360)) { // bonus points for being quick
			setTimeout(function(){updatePoints(((lvl==6?240:360) - perekTime) * 10)},500);
		}
		$('<div style="height:480px"></div>').appendTo('#introduction').append(
			'<p style="font-size:larger;margin-top:20px"><big style="font-size:150%">'+(points-firstPerekPoints)+' points</big> this perek</p>',
			'<p style="font-size:larger">time: '+(function(){var secs=perekTime%60;if(secs.toString().length==1) {secs='0'+secs}return Math.floor(perekTime/60)+':'+secs})()+((perekTime<(lvl==6?240:360))?' &nbsp; &nbsp; &nbsp; +'+(((lvl==6?240:360) - perekTime) * 10)+' points':'')+'</p>',
			'<p style="font-size:larger">total: <big>'+(points - firstPerekPoints +(((lvl==6?240:360) - perekTime) * 10))+' points</big> this perek</p>',
			'<p style="font-size:x-large;margin-top:30px" dir="rtl">'+(lvl==6?'שְׁמַ֖ע יִשְׂרָאֵ֑ל יְהוָ֥ה אֱלֹהֵ֖ינוּ יְהוָ֥ה ׀ אֶחָֽד׃ וְאָ֣הַבְתָּ֔ אֵ֖ת יְהוָ֣ה אֱלֹהֶ֑יךָ בְּכָל־לְבָֽבְךָ֥ וּבְכָל־נַפְשְׁךָ֖ וּבְכָל־מְאֹדֶֽךָ׃ וְהָי֞וּ הַדְּבָרִ֣ים הָאֵ֗לֶּה אֲשֶׁ֨ר אָֽנֹכִ֧י מְצַוְּךָ֛ הַיּ֖וֹם עַל־לְבָבֶֽךָ׃ וְשִׁנַּנְתָּ֣ם לְבָנֶ֔יךָ וְדִבַּרְתָּ֖ בָּ֑ם בְּשִׁבְתְּךָ֤ בְּבֵיתֶ֨ךָ֙ וּבְלֶכְתְּךָ֣ בַדֶּ֔רֶךְ וּֽבְשָׁכְבְּךָ֖ וּבְקוּמֶֽךָ׃ וּקְשַׁרְתָּ֥ם לְא֖וֹת עַל־יָדֶ֑ךָ וְהָי֥וּ לְטֹֽטָפֹ֖ת בֵּ֥ין עֵינֶֽיךָ׃ וּכְתַבְתָּ֛ם עַל־מְזֻז֥וֹת בֵּיתֶ֖ךָ וּבִשְׁעָרֶֽיךָ׃ <a href="http://www.mechon-mamre.org/c/ct/c0506.htm" style="font-size:smaller">(דברים פרק ו)</a>':'וְהָיָ֗ה אִם־שָׁמֹ֤עַ תִּשְׁמְעוּ֙ אֶל־מִצְו‍ֹתַ֔י אֲשֶׁ֧ר אָֽנֹכִ֛י מְצַוֶּ֥ה אֶתְכֶ֖ם הַיּ֑וֹם לְאַֽהֲבָ֞ה אֶת־יְהוָ֤ה אֱלֹֽהֵיכֶם֙ וּלְעָבְד֔וֹ בְּכָל־לְבַבְכֶ֖ם וּבְכָל־נַפְשְׁכֶֽם׃ וְנָֽתַתִּ֧י מְטַֽר־אַרְצְכֶ֛ם בְּעִתּ֖וֹ יוֹרֶ֣ה וּמַלְק֑וֹשׁ וְאָֽסַפְתָּ֣ דְגָנֶ֔ךָ וְתִֽירֹשְׁךָ֖ וְיִצְהָרֶֽךָ׃ וְנָֽתַתִּ֛י עֵ֥שֶׂב בְּשָֽׂדְךָ֖ לִבְהֶמְתֶּ֑ךָ וְאָֽכַלְתָּ֖ וְשָׂבָֽעְתָּ׃ הִשָּֽׁמְר֣וּ לָכֶ֔ם פֶּ֥ן יִפְתֶּ֖ה לְבַבְכֶ֑ם וְסַרְתֶּ֗ם וַֽעֲבַדְתֶּם֙ אֱלֹהִ֣ים אֲחֵרִ֔ים וְהִשְׁתַּֽחֲוִיתֶ֖ם לָהֶֽם׃ וְחָרָ֨ה אַף־יְהוָ֜ה בָּכֶ֗ם וְעָצַ֤ר אֶת־הַשָּׁמַ֨יִם֙ וְלֹֽא־יִהְיֶ֣ה מָטָ֔ר וְהָ֣אֲדָמָ֔ה לֹ֥א תִתֵּ֖ן אֶת־יְבוּלָ֑הּ וַֽאֲבַדְתֶּ֣ם מְהֵרָ֗ה מֵעַל֙ הָאָ֣רֶץ הַטֹּבָ֔ה אֲשֶׁ֥ר יְהוָ֖ה נֹתֵ֥ן לָכֶֽם׃ וְשַׂמְתֶּם֙ אֶת־דְּבָרַ֣י אֵ֔לֶּה עַל־לְבַבְכֶ֖ם וְעַֽל־נַפְשְׁכֶ֑ם וּקְשַׁרְתֶּ֨ם אֹתָ֤ם לְאוֹת֙ עַל־יֶדְכֶ֔ם וְהָי֥וּ לְטֽוֹטָפֹ֖ת בֵּ֥ין עֵֽינֵיכֶֽם׃ וְלִמַּדְתֶּ֥ם אֹתָ֛ם אֶת־בְּנֵיכֶ֖ם לְדַבֵּ֣ר בָּ֑ם בְּשִׁבְתְּךָ֤ בְּבֵיתֶ֨ךָ֙ וּבְלֶכְתְּךָ֣ בַדֶּ֔רֶךְ וּֽבְשָׁכְבְּךָ֖ וּבְקוּמֶֽךָ׃ וּכְתַבְתָּ֛ם עַל־מְזוּז֥וֹת בֵּיתֶ֖ךָ וּבִשְׁעָרֶֽיךָ׃ לְמַ֨עַן יִרְבּ֤וּ יְמֵיכֶם֙ וִימֵ֣י בְנֵיכֶ֔ם עַ֚ל הָֽאֲדָמָ֔ה אֲשֶׁ֨ר נִשְׁבַּ֧ע יְהוָ֛ה לַאֲבֹֽתֵיכֶ֖ם לָתֵ֣ת לָהֶ֑ם כִּימֵ֥י הַשָּׁמַ֖יִם עַל־הָאָֽרֶץ׃ <a href="http://www.mechon-mamre.org/c/ct/c0511.htm" style="font-size:smaller">(דברים פרק יא)</a>')+'</p>',
			'<img src="next.png" alt="next" id="showInfo" style="margin-top:100px" />'
		);
		$('#introduction>div,#world').hide('fast')
		$('#introduction,#introduction>div:last-child').show('fast');
		firstPerekPoints = points;
	});
}//*/
});
