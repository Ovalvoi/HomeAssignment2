document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('price-calculator-form');
    const resultDiv = document.getElementById('price-result');
    const priceDisplay = document.getElementById('calculated-price');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const siteTypeElement = document.querySelector('input[name="siteType"]:checked');
            const pagesElement = document.getElementById('pages');
            const customDesignElement = document.querySelector('input[name="customDesign"]:checked');

            if (!siteTypeElement || !pagesElement || !customDesignElement) {
                 console.error("Form elements not found");
                 return;
            }

            const siteType = siteTypeElement.value;
            const pages = parseInt(pagesElement.value, 10);
            const customDesign = customDesignElement.value === 'yes';

            let basePrice = 0;
            const extraPageCost = 200;
            const customDesignCost = 1000;

            switch (siteType) {
                case 'business':
                    basePrice = 1000;
                    break;
                case 'store':
                    basePrice = 2000;
                    break;
                case 'blog':
                    basePrice = 1500;
                    break;
                default:
                     console.error("Invalid site type selected");
                     return; 
            }

            let totalPagesCost = 0;
            if (pages > 1) {
                totalPagesCost = (pages - 1) * extraPageCost;
            }

            let totalCustomDesignCost = 0;
            if (customDesign) {
                totalCustomDesignCost = customDesignCost;
            }

            const totalPrice = basePrice + totalPagesCost + totalCustomDesignCost;

            if (priceDisplay && resultDiv) {
                 priceDisplay.textContent = `₪${totalPrice.toLocaleString()}`;
                 resultDiv.style.display = 'block';
            } else {
                 console.error("Result display elements not found");
            }
        });

        form.addEventListener('reset', function() {
             if (resultDiv) {
                resultDiv.style.display = 'none';
             }
             if (priceDisplay) {
                 priceDisplay.textContent = '';
             }
             
             const defaultDesignRadio = document.getElementById('designNo');
             if(defaultDesignRadio) defaultDesignRadio.checked = true;

             const pagesInput = document.getElementById('pages');
             if(pagesInput) pagesInput.value = 1;

             const siteTypeRadios = document.querySelectorAll('input[name="siteType"]');
             siteTypeRadios.forEach(radio => radio.checked = false);

        });
    } else {
         console.log("Calculator form not found on this page.");
    }
});
