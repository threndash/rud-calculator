let data = []; // Initialize an empty array for JSON data
const defaultObec = 'Husinec (Praha-východ)';

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
                    data_init = data.find(p => p.rok === '2023');
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
                var option_text = document.createTextNode(RUD.rok);
                option.appendChild(option_text);
                rokDropdown.appendChild(option);
            });
            $('#rokDropdown').selectpicker('refresh');
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
            
            updateNumbers('2023');
        }
        
        function updateProstredkyNaZaka() {
            const selectedRok = document.getElementById("rokDropdown").value;  // Get selected name
            const RUD = data.find(p => p.rok === selectedRok);  // Find RUD

            if (RUD && RUD.prostredky_na_zaka) {
                document.getElementById("prostredkyNaZaka").value = RUD.prostredky_na_zaka.toLocaleString('cs-CZ');  // Show the selected detail
            } else {
                document.getElementById("prostredkyNaZaka").value = '';  // Clear the field if no valid selection
            }
        }
        
        function updateNaklady() {
        	const pocetDeti =  document.getElementById("pocetDeti").value.replace(/\s+/g, '');
        	const nakladyCelkem = document.getElementById("nakladyCelkem").value.replace(/\s+/g, '');
        	const nakladyNaZaka = Math.round(Number(nakladyCelkem) / Number(pocetDeti));
        	const prostredkyNaZaka = document.getElementById("prostredkyNaZaka").value.replace(/\s+/g, '');
        	const prostredkCelkem = prostredkyNaZaka * pocetDeti;
        	const cistyVynosNaZaka = Number(prostredkyNaZaka) - Number(nakladyNaZaka);
        	const cistyVynosCelkem = Math.round(cistyVynosNaZaka * pocetDeti);
        	const cistyVynosNaZakaPerc = Math.round(cistyVynosNaZaka/prostredkyNaZaka * 100);
        	
        	if(nakladyNaZaka){
        	    $('#nakladyCelkemEmpty').hide();
        		document.getElementById("nakladyNaZaka").value = nakladyNaZaka.toLocaleString('cs-CZ');
        		if(prostredkyNaZaka){
        			document.getElementById("cistyVynosNaZaka").value = cistyVynosNaZaka.toLocaleString('cs-CZ');
        			document.getElementById("cistyVynosCelkem").value = cistyVynosCelkem.toLocaleString('cs-CZ');
        			if(cistyVynosNaZakaPerc > 0){
        				document.getElementById("cistyVynosNaZakaPerc").value = '+' + cistyVynosNaZakaPerc + '%';
        				document.getElementById("cistyVynosNaZakaPerc").style.backgroundColor = '#DBFAE0';
        			} else {
        				document.getElementById("cistyVynosNaZakaPerc").value = cistyVynosNaZakaPerc + '%';
        				document.getElementById("cistyVynosNaZakaPerc").style.backgroundColor = '#FADBE0';
        			}
        		} else {
        			document.getElementById("cistyVynosNaZaka").value = '0';
        			document.getElementById("cistyVynosCelkem").value = '0';
        			document.getElementById("cistyVynosNaZakaPerc").value = '0%';
        			document.getElementById("cistyVynosNaZakaPerc").style.backgroundColor = '#fff5b2';
        		}
        	} else {
        		document.getElementById("nakladyNaZaka").value = '0';
        		document.getElementById("cistyVynosNaZaka").value = '0';
        		document.getElementById("cistyVynosCelkem").value = '0';
        		document.getElementById("cistyVynosNaZakaPerc").value = '0%';
        		document.getElementById("cistyVynosNaZakaPerc").style.backgroundColor = '#fff5b2';
        	}
        }
        
        function updateNakladySimu() {
        	const pocetDetiSimu =  document.getElementById("pocetDetiSimu").value.replace(/\s+/g, '');
        	const nakladyCelkemSimu = document.getElementById("nakladyCelkemSimu").value.replace(/\s+/g, '');
        	const nakladyNaZakaSimu = Math.round(Number(nakladyCelkemSimu) / Number(pocetDetiSimu));
        	const prostredkyNaZakaSimu = document.getElementById("prostredkyNaZakaSimu").value.replace(/\s+/g, '');
        	const cistyVynosNaZakaSimu = Number(prostredkyNaZakaSimu) - Number(nakladyNaZakaSimu);
        	const cistyVynosCelkemSimu = Math.round(cistyVynosNaZakaSimu * pocetDetiSimu);
        	const cistyVynosNaZakaSimuPerc = Math.round(cistyVynosNaZakaSimu/prostredkyNaZakaSimu * 100);

        	if(nakladyNaZakaSimu){
        		document.getElementById("nakladyNaZakaSimu").value = nakladyNaZakaSimu.toLocaleString('cs-CZ');
        		if(prostredkyNaZakaSimu){
        			document.getElementById("cistyVynosNaZakaSimu").value = cistyVynosNaZakaSimu.toLocaleString('cs-CZ');
        			document.getElementById("cistyVynosCelkemSimu").value = cistyVynosCelkemSimu.toLocaleString('cs-CZ');
        			if(cistyVynosNaZakaSimuPerc > 0){
        				document.getElementById("cistyVynosNaZakaSimuPerc").value = '+' + cistyVynosNaZakaSimuPerc + '%';
        				document.getElementById("cistyVynosNaZakaSimuPerc").style.backgroundColor = '#DBFAE0';
        			} else {
        				document.getElementById("cistyVynosNaZakaSimuPerc").value = cistyVynosNaZakaSimuPerc + '%';
        				document.getElementById("cistyVynosNaZakaSimuPerc").style.backgroundColor = '#FADBE0';
        			}
        		} else {
        			document.getElementById("cistyVynosNaZakaSimu").value = '0';
        			document.getElementById("cistyVynosCelkemSimu").value = '0';
        			document.getElementById("cistyVynosNaZakaSimuPerc").value = '0%';
        			document.getElementById("cistyVynosNaZakaSimuPerc").style.backgroundColor = '#e9ecef';
        		}
        	} else {
        		document.getElementById("nakladyNaZakaSimu").value = '0';
        		document.getElementById("cistyVynosNaZakaSimu").value = '0';
        		document.getElementById("cistyVynosCelkemSimu").value = '0';
        		document.getElementById("cistyVynosNaZakaSimuPerc").value = '0%';
        		document.getElementById("cistyVynosNaZakaSimuPerc").style.backgroundColor = '#e9ecef';
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
        }
        
        function calculateNakladyCelkemSimu() {
        	const prostredkyNaZakaSimu = document.getElementById("prostredkyNaZakaSimu").value.replace(/\s+/g, '');
        	const pocetDetiSimu = document.getElementById("pocetDetiSimu").value.replace(/\s+/g, '');
        	if (pocetDetiSimu > 0){
        		const cistyVynosNaZakaSimu = document.getElementById("cistyVynosNaZakaSimu").value.replace(/\s+/g, '');
        		const nakladyNaZakaSimu = Number(prostredkyNaZakaSimu) - Number(cistyVynosNaZakaSimu);
        		const nakladyCelkemSimu = nakladyNaZakaSimu * Number(pocetDetiSimu);
        		document.getElementById("nakladyCelkemSimu").value = nakladyCelkemSimu.toLocaleString('cs-CZ');
        		updateNakladySimu();
        		$("#nakladyCelkemSimuError").hide();
        	} else {
        		$("#nakladyCelkemSimuError").show();
        	}
        }
        
        function calculatePocetDetiSimu() {
        	const prostredkyNaZakaSimu = document.getElementById("prostredkyNaZakaSimu").value.replace(/\s+/g, '');
        	const nakladyCelkemSimu = document.getElementById("nakladyCelkemSimu").value.replace(/\s+/g, '');
        	const cistyVynosNaZakaSimu = document.getElementById("cistyVynosNaZakaSimu").value.replace(/\s+/g, '');
        	const nakladyNaZakaSimu = Number(prostredkyNaZakaSimu) - Number(cistyVynosNaZakaSimu);
        	if (nakladyNaZakaSimu > 0){
        		const pocetDetiSimu = Math.round(Number(nakladyCelkemSimu) / nakladyNaZakaSimu);
        		document.getElementById("pocetDetiSimu").value = pocetDetiSimu.toLocaleString('cs-CZ');
        		$("#pocetDetiSimuError").hide();
        	} else {
        		$("#pocetDetiSimuError").show();
        	}
        }
        
        function calculateProstredkyNaZakaSimu() {
        	const pocetDetiSimu =  document.getElementById("pocetDetiSimu").value.replace(/\s+/g, '');
        	const nakladyCelkemSimu = document.getElementById("nakladyCelkemSimu").value.replace(/\s+/g, '');
        	const cistyVynosNaZakaSimu = document.getElementById("cistyVynosNaZakaSimu").value.replace(/\s+/g, '');
        	if (pocetDetiSimu > 0){
        		const nakladyNaZakaSimu = Number(nakladyCelkemSimu) / Number(pocetDetiSimu);
        		const prostredkyNaZakaSimu = Math.round(Number(cistyVynosNaZakaSimu) + nakladyNaZakaSimu);
        		document.getElementById("prostredkyNaZakaSimu").value = prostredkyNaZakaSimu.toLocaleString('cs-CZ');
        		$("#prostredkyNaZakaSimuError").hide();
        	} else {
        		$("#prostredkyNaZakaSimuError").show();
        	}
        }
        
        function updateCistyVynosNaZakaSimu() {
        	const cistyVynosCelkemSimu = document.getElementById("cistyVynosCelkemSimu").value.replace(/\s+/g, '');
        	const pocetDetiSimu =  document.getElementById("pocetDetiSimu").value.replace(/\s+/g, '');
        	if (pocetDetiSimu > 0){
        		const cistyVynosNaZakaSimu = cistyVynosCelkemSimu / pocetDetiSimu;
        		document.getElementById("cistyVynosNaZakaSimu").value = cistyVynosNaZakaSimu.toLocaleString('cs-CZ');
        		$("#cistyVynosNaZakaSimuError").hide();
        	} else {
        		$("#cistyVynosNaZakaSimuError").show();
        	}
        }
        
        function updateCistyVynosCelkemSimu() {
        	const cistyVynosNaZakaSimu = document.getElementById("cistyVynosNaZakaSimu").value.replace(/\s+/g, '');
        	const pocetDetiSimu =  document.getElementById("pocetDetiSimu").value.replace(/\s+/g, '');
        	const cistyVynosCelkemSimu = Math.round(cistyVynosNaZakaSimu * pocetDetiSimu);
        	document.getElementById("cistyVynosCelkemSimu").value = cistyVynosCelkemSimu.toLocaleString('cs-CZ');
        }
        
        function updatePocetDetiSimu() {
        	const pocetDetiSimu =  document.getElementById("pocetDetiSimu").value.replace(/\s+/g, '');
        	if(pocetDetiSimu>0){
        		const prostredkyNaZakaSimu = document.getElementById("prostredkyNaZakaSimu").value.replace(/\s+/g, '');
        		const prostredkyCelkemSimu = Number(pocetDetiSimu) * Number(prostredkyNaZakaSimu);
        		document.getElementById("prostredkyCelkemSimu").value = prostredkyCelkemSimu.toLocaleString('cs-CZ');
        		const nakladyCelkemSimu = document.getElementById("nakladyCelkemSimu").value.replace(/\s+/g, '');
        		const nakladyNaZakaSimu = Number(nakladyCelkemSimu) / Number(pocetDetiSimu);
        		document.getElementById("nakladyNaZakaSimu").value = nakladyNaZakaSimu.toLocaleString('cs-CZ');
				const cistyVynosNaZakaSimu = prostredkyCelkemSimu - nakladyNaZakaSimu;
				const cistyVynosCelkemSimu = Math.round(cistyVynosNaZakaSimu * pocetDetiSimu);
				document.getElementById("cistyVynosNaZakaSimu").value = cistyVynosNaZakaSimu.toLocaleString('cs-CZ');
        		document.getElementById("cistyVynosCelkemSimu").value = cistyVynosCelkemSimu.toLocaleString('cs-CZ');
        	} else {
        		document.getElementById("prostredkyCelkemSimu").value = '0';
        		document.getElementById("nakladyNaZakaSimu").value = '0';
				document.getElementById("cistyVynosNaZakaSimu").value = '0';
        		document.getElementById("cistyVynosCelkemSimu").value = '0';
        	}
        }
        
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

   		// Call the function to apply the thousand separator to all numeric inputs on page load

        // Call loadJSON on page load to get the data from file
        window.onload = function() {
            loadJSON();
            applyThousandSeparatorToNumericInputs();
        };