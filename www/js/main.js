(function ($) {

  $("#default").click(function () {
    $("#rokDropdown").val('2023');
    $('#rokDropdown').selectpicker('refresh');
    $('#rokDropdown').selectpicker('render');
    
    $('#obecDropdown').val(defaultObec);
    $('#obecDropdown').selectpicker('refresh');
    $('#obecDropdown').selectpicker('render');
    
    updateProstredkyNaZaka();
    document.getElementById("pocetDeti").value = '0';
    document.getElementById("prostredkyCelkem").value = '0';
    document.getElementById("nakladyCelkem").value = '0';
    document.getElementById("cistyVynosCelkem").value = '0';
    document.getElementById("nakladyNaZaka").value = '0';
    document.getElementById("cistyVynosNaZaka").value = '0';

  });
  
  $("#reset").click(function () {
    $("#prostredkyNaZakaSimu").val('0');
    $("#pocetDetiSimu").val('0');
    $("#prostredkyCelkemSimu").val('0');
    $("#nakladyCelkemSimu").val('0');
    $("#nakladyNaZakaSimu").val('0');
    $("#cistyVynosNaZakaSimu").val('0');
    $("#cistyVynosCelkemSimu").val('0');
  });
  
  $("#copy").click(function () {
  	document.getElementById("prostredkyNaZakaSimu").value = document.getElementById("prostredkyNaZaka").value;
  	document.getElementById("pocetDetiSimu").value = document.getElementById("pocetDeti").value;
  	document.getElementById("prostredkyCelkemSimu").value = document.getElementById("prostredkyCelkem").value;
  	document.getElementById("nakladyCelkemSimu").value = document.getElementById("nakladyCelkem").value;
  	document.getElementById("nakladyNaZakaSimu").value = document.getElementById("nakladyNaZaka").value;
  	document.getElementById("cistyVynosNaZakaSimu").value = document.getElementById("cistyVynosNaZaka").value;
  	document.getElementById("cistyVynosCelkemSimu").value = document.getElementById("cistyVynosCelkem").value;
  });
  
  $("#calculate").click(function () {
    if($("#nakladyCelkem").val() === '0' || $("#nakladyCelkem").val() === '') {
    	$('#nakladyCelkemEmpty').show();
    }
  });

})(jQuery);

jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up"><span class="fas fa-caret-up"></span></div><div class="quantity-button quantity-down"><span class="fas fa-caret-down"></span></div></div>').insertAfter('.quantity input');
    
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