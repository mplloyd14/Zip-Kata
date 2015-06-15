// wth is this? it's part of mocking calls to the backend providers.
// working in conjunction with mockLoader, 
// MockServices: angular service that must be defined that includes the "services" and their responses
//		if "error" is present, it will return the error, else it will return the data
/*
	{
    	getFUBAR: {
        	data: [],
            error: null
        },
        getSNAFU: {
        	data: null,
            error: {errorNum: 1001, errorMsg: 'bad things'}
        }
	}
*/
{
	getPartners: {
    	data: MockData.partners
	},
	getPartnerByCode: {
    	data: MockData.partners
	},
	removePartner: {
    	data: MockData.partners
	},
	savePartner: {
    	data: MockData.partners
	},
	getProductConfigurationsByCompany: {
    	data: MockData.products
	}
}
