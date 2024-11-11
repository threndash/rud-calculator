let data = []; // Initialize an empty array for JSON data
const defaultObec = '';
const defaultRok = '2023';

        // Function to load JSON data from file
        function loadJSON() {
            fetch('www/files/data.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(jsonData => {
                    data = jsonData; // Store the JSON data
                    data_init = data.find(p => p.rok === defaultRok);
        			obecKeys = Object.keys(data_init.obec);
                    populateRokDropdown(); // Populate the dropdown once data is loaded
                    populateObecDropdown();
                })
                .catch(error => console.error('Error loading JSON:', error));
        }

        // Function to populate the dropdown with names from JSON
        function populateRokDropdown() {
            data.forEach(RUD => {
                var rokDropdown = document.getElementById("rokDropdown");
                var option = document.createElement("option");
                option.value = RUD.rok;
                if(RUD.rok === '2024'){
                	var option_text = `${RUD.rok}\u00B3`;
                } else {
                	var option_text = RUD.rok;
                }
                option.textContent = option_text;
                rokDropdown.appendChild(option);
            });
            $('#rokDropdown').selectpicker('refresh');
            $('#rokDropdown').val(defaultRok);
            $('#rokDropdown').selectpicker('refresh');
            $('#rokDropdown').selectpicker('render');
        }
        
        function populateObecDropdown() {
            obecKeys.forEach(key => {
                var obecDropdown = document.getElementById("obecDropdown");
                var option = document.createElement("option");
                var option_text = document.createTextNode(key);
                option.appendChild(option_text);
                obecDropdown.appendChild(option);
            });
            $('#obecDropdown').selectpicker('refresh');
            $('#obecDropdown').val(defaultObec);
            $('#obecDropdown').selectpicker('refresh');
            $('#obecDropdown').selectpicker('render');
            
            updateNumbers(defaultRok);
        }
        
        // Realne udaje
        function cistyVynosNaZakaPerc() {
        	var cistyVynosNaZaka = document.getElementById("cistyVynosNaZaka").value.replace(/\s+/g, '');
        	var prostredkyNaZaka = document.getElementById("prostredkyNaZaka").value.replace(/\s+/g, '');
        	var cistyVynosNaZakaPerc = Math.round(cistyVynosNaZaka/prostredkyNaZaka * 100);
        		
        	if(cistyVynosNaZakaPerc > 0){
        		document.getElementById("cistyVynosNaZakaPerc").value = '+' + cistyVynosNaZakaPerc + '%';
        		document.getElementById("cistyVynosNaZakaPerc").setAttribute("style","background-color: #DBFAE0 !important");
        	} else if(cistyVynosNaZakaPerc < 0) {
        		document.getElementById("cistyVynosNaZakaPerc").value = cistyVynosNaZakaPerc + '%';
        		document.getElementById("cistyVynosNaZakaPerc").setAttribute("style","background-color: #FADBE0 !important");
        	} else {
        		document.getElementById("cistyVynosNaZakaPerc").value = cistyVynosNaZakaPerc + '%';
        		document.getElementById("cistyVynosNaZakaPerc").setAttribute("style","background-color: #e9ecef !important");
        	}
        }
        
        function cistyVynosNaZakaPercEmpty() {
        	document.getElementById("cistyVynosNaZakaPerc").value = '';
        	document.getElementById("cistyVynosNaZakaPerc").style.backgroundColor = '#e9ecef !important';
        }
        
        function cistyVynosCelkemPerc() {
        	var cistyVynosCelkem = document.getElementById("cistyVynosCelkem").value.replace(/\s+/g, '');
        	var prostredkyCelkem = document.getElementById("prostredkyCelkem").value.replace(/\s+/g, '');
        	var cistyVynosCelkemPerc = Math.round(cistyVynosCelkem/prostredkyCelkem * 100);
        		
        	if(cistyVynosCelkemPerc > 0){
        		document.getElementById("cistyVynosCelkemPerc").value = '+' + cistyVynosCelkemPerc + '%';
        		document.getElementById("cistyVynosCelkemPerc").setAttribute("style","background-color: #DBFAE0 !important");
        	} else if(cistyVynosCelkemPerc < 0) {
        		document.getElementById("cistyVynosCelkemPerc").value = cistyVynosCelkemPerc + '%';
        		document.getElementById("cistyVynosCelkemPerc").setAttribute("style","background-color: #FADBE0 !important");
        	} else {
        		document.getElementById("cistyVynosCelkemPerc").value = cistyVynosCelkemPerc + '%';
        		document.getElementById("cistyVynosCelkemPerc").setAttribute("style","background-color: #e9ecef !important");
        	}
        }
        
        function cistyVynosCelkemPercEmpty() {
        	document.getElementById("cistyVynosCelkemPerc").value = '';
        	document.getElementById("cistyVynosCelkemPerc").setAttribute("style","background-color: #e9ecef !important");
        }
        
        function updateProstredkyNaZaka() {
            const selectedRok = document.getElementById("rokDropdown").value;  // Get selected name
            const RUD = data.find(p => p.rok === selectedRok);  // Find RUD

            if (RUD && RUD.prostredky_na_zaka) {
                document.getElementById("prostredkyNaZaka").value = RUD.prostredky_na_zaka.toLocaleString('cs-CZ');  // Show the selected detail
            } else {
                document.getElementById("prostredkyNaZaka").value = '';  // Clear the field if no valid selection
            }
            updateNaklady();
        }
        
        function updateNaklady() {
        	const pocetDeti =  document.getElementById("pocetDeti").value.replace(/\s+/g, '');
        	const nakladyCelkem = document.getElementById("nakladyCelkem").value.replace(/\s+/g, '');
        	
        	if(Number(pocetDeti)>0){
        		var nakladyNaZaka = Math.round(Number(nakladyCelkem) / Number(pocetDeti));
        	} else {
        		var nakladyNaZaka = '0';
        	}
        	const prostredkyNaZaka = document.getElementById("prostredkyNaZaka").value.replace(/\s+/g, '');
        	const prostredkyCelkem = Number(prostredkyNaZaka) * Number(pocetDeti);
        	const cistyVynosNaZaka = Number(prostredkyNaZaka) - Number(nakladyNaZaka);
        	const cistyVynosCelkem = prostredkyCelkem - Number(nakladyCelkem);
        	
        	$('#nakladyCelkemEmpty').hide();
        	document.getElementById("nakladyNaZaka").value = nakladyNaZaka.toLocaleString('cs-CZ');
        		if(prostredkyNaZaka){
        			document.getElementById("cistyVynosNaZaka").value = cistyVynosNaZaka.toLocaleString('cs-CZ');
        			document.getElementById("cistyVynosCelkem").value = cistyVynosCelkem.toLocaleString('cs-CZ');
        			if(cistyVynosNaZaka !== 0){
        				cistyVynosNaZakaPerc();
        			}else{
        				cistyVynosNaZakaPercEmpty();
        			}
        			if(cistyVynosCelkem !== 0){
        				cistyVynosCelkemPerc();
        			}else{
        				cistyVynosCelkemPercEmpty();
        			}
        		} else {
        			document.getElementById("cistyVynosNaZaka").value = '0';
        			document.getElementById("cistyVynosCelkem").value = '0';
        			cistyVynosNaZakaPercEmpty();
        			cistyVynosCelkemPercEmpty();
        		}
        }
        
        function updatePocetDeti() {
            const selectedRok = document.getElementById("rokDropdown").value;  // Get selected rok
            const selectedOkres = document.getElementById("obecDropdown").value;  // Get selected obec
            const RUD = data.find(p => p.rok === selectedRok);  // Find RUD
            const pocetDeti = RUD.obec[selectedOkres];
            const prostredkyNaZaka = RUD.prostredky_na_zaka;
            const prostredkyCelkem = prostredkyNaZaka * pocetDeti;
            
            if (RUD && RUD.obec && selectedOkres) {
                document.getElementById("pocetDeti").value = pocetDeti.toLocaleString('cs-CZ');  // Show pocet deti
                document.getElementById("prostredkyCelkem").value = prostredkyCelkem.toLocaleString('cs-CZ'); // Show prostredky celkem
            } else {
                document.getElementById("pocetDeti").value = '0';  // Clear the field if no valid selection
            }
            updateNaklady();
        }
        
        function updateNumbers(selectedRok) {
        	updateProstredkyNaZaka();
        	updatePocetDeti();
        	updateNaklady();
        }
        
        // Simulace - Update
        
        function updatePocetDetiSimu() {
        	divisionZeroError();
        	addClass('warn');
        	cistyVynosNaZakaSimuPercEmpty();
        	cistyVynosCelkemSimuPercEmpty();
        	        	
        	const pocetDetiSimu =  document.getElementById("pocetDetiSimu").value.replace(/\s+/g, '');
			
        	if (Number(pocetDetiSimu) > 0) {
        		const prostredkyNaZakaSimu = document.getElementById("prostredkyNaZakaSimu").value.replace(/\s+/g, '');
        		const nakladyCelkemSimu = document.getElementById("nakladyCelkemSimu").value.replace(/\s+/g, '');
        		const cistyVynosCelkemSimu = document.getElementById("cistyVynosCelkemSimu").value.replace(/\s+/g, '');
        			
        		const prostredkyCelkemSimu = Math.round(Number(prostredkyNaZakaSimu) * Number(pocetDetiSimu));
        		const nakladyNaZakaSimu = Math.round(Number(nakladyCelkemSimu) / Number(pocetDetiSimu));
        		const cistyVynosNaZakaSimu = Math.round(Number(cistyVynosCelkemSimu) / Number(pocetDetiSimu));
        			
        		document.getElementById("prostredkyCelkemSimu").value = prostredkyCelkemSimu.toLocaleString('cs-CZ');
        		document.getElementById("nakladyNaZakaSimu").value = nakladyNaZakaSimu.toLocaleString('cs-CZ');
        		document.getElementById("cistyVynosNaZakaSimu").value = cistyVynosNaZakaSimu.toLocaleString('cs-CZ');
        	} else {
        		document.getElementById("prostredkyCelkemSimu").value = '0';
        		document.getElementById("nakladyNaZakaSimu").value = 'Dělení nulou';
        		document.getElementById("cistyVynosNaZakaSimu").value = 'Dělení nulou';
        	}
        }
        
        // Simulace - Update - Celkem
        
        function updateNakladyCelkemSimu() {
        	updatePocetDetiSimu();
        	addClass('warn');
        	cistyVynosNaZakaSimuPercEmpty();
        	cistyVynosCelkemSimuPercEmpty();
        }
        
        function updateCistyVynosCelkemSimu() {
        	updatePocetDetiSimu();
        	addClass('warn');
        	cistyVynosNaZakaSimuPercEmpty();
        	cistyVynosCelkemSimuPercEmpty();
        }
        
        // Simulace - Update - Na Zaka
        
        function updateProstredkyNaZakaSimu () {
			const pocetDetiSimu =  document.getElementById("pocetDetiSimu").value.replace(/\s+/g, '');
			
        	if (Number(pocetDetiSimu) > 0) {
        		const prostredkyNaZakaSimu = document.getElementById("prostredkyNaZakaSimu").value.replace(/\s+/g, '');
        		const prostredkyCelkemSimu = Math.round(Number(prostredkyNaZakaSimu) * Number(pocetDetiSimu));
        		document.getElementById("prostredkyCelkemSimu").value = prostredkyCelkemSimu.toLocaleString('cs-CZ');
        	}
        	
			addClass('warn');
			cistyVynosNaZakaSimuPercEmpty();
			cistyVynosCelkemSimuPercEmpty();
        }
        
        // Simulace - Perc Cisty Vynos
        
        function cistyVynosNaZakaSimuPerc() {
        	var cistyVynosNaZakaSimu = document.getElementById("cistyVynosNaZakaSimu").value.replace(/\s+/g, '');
        	var prostredkyNaZakaSimu = document.getElementById("prostredkyNaZakaSimu").value.replace(/\s+/g, '');
        	var cistyVynosNaZakaSimuPerc = Math.round(cistyVynosNaZakaSimu/prostredkyNaZakaSimu * 100);
        		
        	if(cistyVynosNaZakaSimuPerc > 0){
        		document.getElementById("cistyVynosNaZakaSimuPerc").value = '+' + cistyVynosNaZakaSimuPerc + '%';
        		document.getElementById("cistyVynosNaZakaSimuPerc").setAttribute("style","background-color: #DBFAE0 !important");
        	} else if(cistyVynosNaZakaSimuPerc < 0) {
        		document.getElementById("cistyVynosNaZakaSimuPerc").value = cistyVynosNaZakaSimuPerc + '%';
        		document.getElementById("cistyVynosNaZakaSimuPerc").setAttribute("style","background-color: #FADBE0 !important");
        	} else {
        		document.getElementById("cistyVynosNaZakaSimuPerc").value = cistyVynosNaZakaSimuPerc + '%';
        		document.getElementById("cistyVynosNaZakaSimuPerc").setAttribute("style","background-color: #e9ecef !important");
        	}
        }
        
        function cistyVynosNaZakaSimuPercEmpty() {
        	document.getElementById("cistyVynosNaZakaSimuPerc").value = '';
        	document.getElementById("cistyVynosNaZakaSimuPerc").style.backgroundColor = '#e9ecef !important';
        }
        
        function cistyVynosCelkemSimuPerc() {
        	var cistyVynosCelkemSimu = document.getElementById("cistyVynosCelkemSimu").value.replace(/\s+/g, '');
        	var prostredkyCelkemSimu = document.getElementById("prostredkyCelkemSimu").value.replace(/\s+/g, '');
        	var cistyVynosCelkemSimuPerc = Math.round(cistyVynosCelkemSimu/prostredkyCelkemSimu * 100);
        		
        	if(cistyVynosCelkemSimuPerc > 0){
        		document.getElementById("cistyVynosCelkemSimuPerc").value = '+' + cistyVynosCelkemSimuPerc + '%';
        		document.getElementById("cistyVynosCelkemSimuPerc").setAttribute("style","background-color: #DBFAE0 !important");
        	} else if(cistyVynosCelkemSimuPerc < 0) {
        		document.getElementById("cistyVynosCelkemSimuPerc").value = cistyVynosCelkemSimuPerc + '%';
        		document.getElementById("cistyVynosCelkemSimuPerc").setAttribute("style","background-color: #FADBE0 !important");
        	} else {
        		document.getElementById("cistyVynosCelkemSimuPerc").value = cistyVynosCelkemSimuPerc + '%';
        		document.getElementById("cistyVynosCelkemSimuPerc").setAttribute("style","background-color: #e9ecef !important");
        	}
        }
        
        function cistyVynosCelkemSimuPercEmpty() {
        	document.getElementById("cistyVynosCelkemSimuPerc").value = '';
        	document.getElementById("cistyVynosCelkemSimuPerc").setAttribute("style","background-color: #e9ecef !important");
        }
        
                
        // Simulace - Calculate - PocetDeti
        function calculatePocetDetiSimu() {
        	const cistyVynosCelkemSimu = document.getElementById("cistyVynosCelkemSimu").value.replace(/\s+/g, '');
        	const nakladyCelkemSimu = document.getElementById("nakladyCelkemSimu").value.replace(/\s+/g, '');
        	const prostredkyNaZakaSimu = document.getElementById("prostredkyNaZakaSimu").value.replace(/\s+/g, '');
        	
        	const pocetDetiSimu = (Number(nakladyCelkemSimu) + Number(cistyVynosCelkemSimu)) / Number(prostredkyNaZakaSimu);
       		const cistyVynosNaZakaSimu = Number(cistyVynosCelkemSimu)/pocetDetiSimu;
       		const nakladyNaZakaSimu = Number(nakladyCelkemSimu)/pocetDetiSimu;
       		const prostredkyCelkemSimu = Number(prostredkyNaZakaSimu)*pocetDetiSimu;
       		
       		document.getElementById("pocetDetiSimu").value = Math.round(pocetDetiSimu).toLocaleString('cs-CZ');
       		document.getElementById("cistyVynosNaZakaSimu").value = Math.round(cistyVynosNaZakaSimu).toLocaleString('cs-CZ');
       		document.getElementById("nakladyNaZakaSimu").value = Math.round(nakladyNaZakaSimu).toLocaleString('cs-CZ');
       		document.getElementById("prostredkyCelkemSimu").value = Math.round(prostredkyCelkemSimu).toLocaleString('cs-CZ');
       		
        	removeClass('warn');
			cistyVynosNaZakaSimuPerc();
			cistyVynosCelkemSimuPerc();
        }        
                
        // Simulace - Calculate - Celkem
        
        function calculateCistyVynosCelkemSimu() {
        	const prostredkyNaZakaSimu = document.getElementById("prostredkyNaZakaSimu").value.replace(/\s+/g, '');
        	const pocetDetiSimu = document.getElementById("pocetDetiSimu").value.replace(/\s+/g, '');
        	const nakladyCelkemSimu = document.getElementById("nakladyCelkemSimu").value.replace(/\s+/g, '');
			
			const cistyVynosCelkemSimu = Number(prostredkyNaZakaSimu)*Number(pocetDetiSimu) - Number(nakladyCelkemSimu);
			const cistyVynosNaZakaSimu = cistyVynosCelkemSimu/Number(pocetDetiSimu);

       		document.getElementById("cistyVynosCelkemSimu").value = cistyVynosCelkemSimu.toLocaleString('cs-CZ');
       		document.getElementById("cistyVynosNaZakaSimu").value = Math.round(cistyVynosNaZakaSimu).toLocaleString('cs-CZ');
        	
        	removeClass('warn');
        	cistyVynosNaZakaSimuPerc();
        	cistyVynosCelkemSimuPerc();
        }
        
        function calculateNakladyCelkemSimu() {
			const prostredkyNaZakaSimu = document.getElementById("prostredkyNaZakaSimu").value.replace(/\s+/g, '');
        	const pocetDetiSimu = document.getElementById("pocetDetiSimu").value.replace(/\s+/g, '');
        	const cistyVynosCelkemSimu = document.getElementById("cistyVynosCelkemSimu").value.replace(/\s+/g, '');
			
			const nakladyCelkemSimu = Number(prostredkyNaZakaSimu)*Number(pocetDetiSimu) - Number(cistyVynosCelkemSimu);
			const nakladyNaZakaSimu = nakladyCelkemSimu/Number(pocetDetiSimu);

       		document.getElementById("nakladyCelkemSimu").value = nakladyCelkemSimu.toLocaleString('cs-CZ');
       		document.getElementById("nakladyNaZakaSimu").value = Math.round(nakladyNaZakaSimu).toLocaleString('cs-CZ');
        	
        	removeClass('warn');
        	cistyVynosNaZakaSimuPerc();
        	cistyVynosCelkemSimuPerc();
        }
        
        // Simulace - Calculate - Na Zaka
        
        function calculateProstredkyNaZakaSimu() {
        	const nakladyCelkemSimu = document.getElementById("nakladyCelkemSimu").value.replace(/\s+/g, '');
        	const cistyVynosCelkemSimu = document.getElementById("cistyVynosCelkemSimu").value.replace(/\s+/g, '');
        	const pocetDetiSimu = document.getElementById("pocetDetiSimu").value.replace(/\s+/g, '');
			
			const prostredkyCelkemSimu = Number(nakladyCelkemSimu) + Number(cistyVynosCelkemSimu);
			const prostredkyNaZakaSimu = prostredkyCelkemSimu/Number(pocetDetiSimu);
			
        	document.getElementById("prostredkyCelkemSimu").value = Math.round(prostredkyCelkemSimu).toLocaleString('cs-CZ');
        	document.getElementById("prostredkyNaZakaSimu").value = Math.round(prostredkyNaZakaSimu).toLocaleString('cs-CZ');
        	removeClass('warn');
        	cistyVynosNaZakaSimuPerc();
        	cistyVynosCelkemSimuPerc();
        }
        
    	// Errors
        function divisionZeroError() {
        	const pocetDetiSimu =  document.getElementById("pocetDetiSimu").value.replace(/\s+/g, '');
        	
        	if (Number(pocetDetiSimu) > 0) {
        		$("#pocetDetiSimuZeroError").hide();
        	} else {
        		$("#pocetDetiSimuZeroError").show();
        	}
        }
    	
    	// Extra functions
        
        function formatNumberWithSpaces(value) {
        // Remove existing spaces before formatting
        value = value.replace(/\s+/g, '');

        // Add spaces as thousand separators
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    	}
    	
    	function applyThousandSeparatorToNumericInputs() {
        // Get all inputs with the class 'user-input'
        const numericInputs = document.querySelectorAll('.user-input');

        // Add event listener for 'input' event on each numeric input field
        numericInputs.forEach(input => {
            input.addEventListener('input', function (e) {
                // Get the current cursor position
                const cursorPosition = input.selectionStart;

                // Format the value
                const formattedValue = formatNumberWithSpaces(input.value);

                // Set the formatted value back to the input
                input.value = formattedValue;

                // Set the cursor position to the end of the input
                input.setSelectionRange(cursorPosition, cursorPosition);
            });
        });
    	}
    	
    	function addClass(className) {
  			const buttonIds = ['calculateNakladyCelkemSimu','calculateProstredkyNaZakaSimu','calculatePocetDetiSimu','calculateCistyVynosCelkemSimu'];

			buttonIds.forEach(id => {
    		const element = document.getElementById(id);

    		if (element) {
      		element.classList.add(className);
    		}
  			});
		}

		function removeClass(className) {
  			const buttonIds = ['calculateNakladyCelkemSimu','calculateProstredkyNaZakaSimu','calculatePocetDetiSimu','calculateCistyVynosCelkemSimu'];

  			buttonIds.forEach(id => {
    		const element = document.getElementById(id);

    		if (element) {
   			element.classList.remove(className);
    		}
    		});
		}
		
   		// Call the function to apply the thousand separator to all numeric inputs on page load

        // Call loadJSON on page load to get the data from file
        window.onload = function() {
            loadJSON();
            applyThousandSeparatorToNumericInputs();
        };