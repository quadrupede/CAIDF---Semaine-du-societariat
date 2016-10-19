<?php
        /** table unique : somaire.sql **/

	$req_category_items_organisateur = "SELECT id, label
		FROM sub_category
		WHERE category = 1
		ORDER BY order_rank
		;";

	$req_category_items_lieu = "SELECT id, label
		FROM sub_category
		WHERE category = 2
		ORDER BY order_rank
		;";

	$req_category_items_partenariat = "SELECT id, label
		FROM sub_category
		WHERE category = 3
		ORDER BY order_rank
		;";

	$req_category_items_cible = "SELECT id, label
		FROM sub_category
		WHERE category = 4
		ORDER BY order_rank
		;";

	$req_list_all_docs = "select id , numero , visuel , nom , document from sommaire " ;

	$req_list_sub_category_documents = "select id , numero , visuel , nom , document from sommaire where `sub_category` = 'sub_category_id' " ;

	$req_list_doc_mois = "select id , numero , visuel , nom , document from sommaire where `debut` <= 'debut' AND fin >= 'fin' ;";

	$req_list_doc_noms = "select id , numero , visuel , nom , document from sommaire where `nom` LIKE 'value' " ; // FIXME : UTILISE ??

	$req_get_document = "select id , document from sommaire where id = :value" ;

	$mois = array(

		 "01" => "jan"	//=> array( "01","Janvier" )
		,"02" => "fev"   //=> array( "02","Février")
		,"03" => "mar"   //=> array( "03","Mars")
		,"04" => "avr"	//=> array( "04","Avril")
		,"05" => "mai"	//=> array( "05","Mai")
		,"06" => "jun"	//=> array( "06","Juin")
		,"07" => "jul"	//=> array( "07","Juillet")
		,"08" => "aou"	//=> array( "08","Août")
		,"09" => "sep"	//=> array( "09","Septembre")
		,"10" => "oct"	//=> array( "10","Octobre")
		,"11" => "nov"	//=> array( "11","Novembre")
		,"12" => "dec"	//=> array( "12","Décembre")
	);
	
	