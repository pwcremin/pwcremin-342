"use strict";

var DiscoveryV1 = require( 'watson-developer-cloud/discovery/v1' );

function getDiscoveryCredentials()
{
	var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
	
	// Pattern match to find the first instance of a Discovery service in
	// VCAP_SERVICES. If you know your service key, you can access the
	// service credentials directly by using the vcapServices object.
	for (var vcapService in vcapServices) 
	{
		if (vcapService.match(/discovery/i)) 
		{
		        return {
		        	username: vcapServices[vcapService][0].credentials.username,
				password: vcapServices[vcapService][0].credentials.password
			};
		}
	}
}


var discoveryCredentials = getDiscoveryCredentials();

var discovery = new DiscoveryV1( {
    username: discoveryCredentials.username,
    password: discoveryCredentials.password,
    version_date: DiscoveryV1.VERSION_DATE_2016_12_15
} );

exports.index = function(req, res){
discovery.query( {
    environment_id: '9d72194c-bfa5-41ec-b47b-00b7a1943612',
    collection_id: '8854ecb2-6c2b-4bfd-acca-8333a9f4b64e',

    query: 'text:Bitcoin'
    
}, function ( err, queryResponse )
{
    if ( err )
    {
        console.error( err );
        res.json( {err} );
    }
    else
    {
        //let queryResult = JSON.stringify( queryResponse, null, 2 )

        res.json( queryResponse );
    }
} );
};