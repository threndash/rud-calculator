(function ($) {

  $(
    "#nweeks, #nweekspres, #effect, #return, #avwage, #discount, #wgrowth, #life, #nstud"
  ).change(function () {
    var ywage = $("#avwage").val() * 12;
    var persincome =
      ((ywage * ($("#return").val() / 100) * $("#nweekspres").val()) /
        $("#nweeks").val()) *
      (1 - $("#effect").val() / 100);
    $("#persincome").val(persincome.toFixed(0));
  });

  $(
    "#nweeks, #nweekspres, #effect, #return, #avwage, #discount, #wgrowth, #life, #nstud"
  ).on("change", function () {
    var lifelen = $("#life").val() - 1;
    var lifeincome = 0;
    for (var i = 0; i <= lifelen; i++) {
      lifeincome =
        lifeincome +
        $("#persincome").val() *
          ((1 + $("#wgrowth").val() / 100) /
            (1 + $("#discount").val() / 100)) **
            i;
    }
    $("#totpersincome").val(lifeincome.toFixed(0));
  });

  $(
    "#nweeks, #nweekspres, #effect, #return, #avwage, #discount, #wgrowth, #life, #nstud"
  ).on("change", function () {
    var totincome = ($("#totpersincome").val() * $("#nstud").val()) / 1000000000;
    $("#totincome").val(totincome.toFixed(1));
  });

  $(
    "#nweeks, #nweekspres, #effect, #return, #avwage, #discount, #wgrowth, #life, #nstud"
  ).on("change", function () {
    var pubbud = $("#totincome").val() * 0.34;
    $("#pubbud").val(pubbud.toFixed(1));
  });

  $(
    "#nweeks, #nweekspres, #effect, #return, #avwage, #discount, #wgrowth, #life, #nstud"
  ).on("change", function () {
    var totincome = Number($("#totincome").val());
    var pubbud = Number($("#pubbud").val());
    var total = totincome + pubbud;
    $("#total").val(total.toFixed(1));
  });
  
  $(
    "#nstud"
  ).on("change", function () {
    var pcrcost = 150*2*Number($("#nstud").val())/10**9;
    $("#pcrcost").val(pcrcost.toFixed(2));
  });
  
  

  $("#default").click(function () {
    $("#rokDropdown").val('2023');
    $('#rokDropdown').selectpicker('refresh');
    $('#rokDropdown').selectpicker('render');
    
    $('#obecDropdown').val(defaultObec);
    $('#obecDropdown').selectpicker('refresh');
    $('#obecDropdown').selectpicker('render');
    
    updateNumbers('2023');
  });
  
  $("#reset").click(function () {
    $("#prostredkyNaZakaSimu").val('0');
    $("#pocetDetiSimu").val('0');
    $("#prostredkyCelkemSimu").val('0');
    $("#nakladyCelkemSimu").val('0');
    $("#nakladyNaZakaSimu").val('0');
  });
  
  $("#copy").click(function () {
  	document.getElementById("prostredkyNaZakaSimu").value = document.getElementById("prostredkyNaZaka").value;
  	document.getElementById("pocetDetiSimu").value = document.getElementById("pocetDeti").value;
  	document.getElementById("prostredkyCelkemSimu").value = document.getElementById("prostredkyCelkem").value;
  	document.getElementById("nakladyCelkemSimu").value = document.getElementById("nakladyCelkem").value;
  	document.getElementById("nakladyNaZakaSimu").value = document.getElementById("nakladyNaZaka").value;
  	document.getElementById("cistyVynosNaZakaSimu").value = document.getElementById("cistyVynosNaZaka").value;
  	document.getElementById("cistyVynosCelkemSimu").value = document.getElementById("cistyVynosCelkem").value;
  	updateNakladySimu();
  });
  
  $("#calculate").click(function () {
    if($("#nakladyCelkem").val() === '0' || $("#nakladyCelkem").val() === '') {
    	$('#nakladyCelkemEmpty').show();
    }
  });

})(jQuery);

jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up"><span class="fas fa-caret-up"></span></div><div class="quantity-button quantity-down"><span class="fas fa-caret-down"></span></div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {
      var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        step = parseFloat(input.attr('step')),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + step;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - step;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });
    
    $(document).ready(function () {
        // Initialize Bootstrap Select
        $('.selectpicker').selectpicker({
        maxOptions:2
        });
        
        $('#obecDropdown').on('shown.bs.select', function() {
        	const selectedObec = $('#obecDropdown').val();
        	if (selectedObec) {
        		const selectedObecIndex = obecKeys.findIndex(key => key === selectedObec);
            	const $dropdownMenu = $(this).siblings('.dropdown-menu').find('.inner');
            	const optionHeight = $dropdownMenu.find('li').height();
            	$dropdownMenu.scrollTop(selectedObecIndex * optionHeight);
        	}
        });
    });