<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier contient les réglages de configuration suivants : réglages MySQL,
 * préfixe de table, clefs secrètes, langue utilisée, et ABSPATH.
 * Vous pouvez en savoir plus à leur sujet en allant sur
 * {@link http://codex.wordpress.org/fr:Modifier_wp-config.php Modifier
 * wp-config.php}. C'est votre hébergeur qui doit vous donner vos
 * codes MySQL.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d'installation. Vous n'avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en "wp-config.php" et remplir les
 * valeurs.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define('DB_NAME', 'caidf_semaine_du_societariat');

/** Utilisateur de la base de données MySQL. */
define('DB_USER', 'root');

/** Mot de passe de la base de données MySQL. */
define('DB_PASSWORD', '');

/** Adresse de l'hébergement MySQL. */
define('DB_HOST', 'localhost');

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define('DB_CHARSET', 'utf8mb4');

/** Type de collation de la base de données.
  * N'y touchez que si vous savez ce que vous faites.
  */
define('DB_COLLATE', '');

/**#@+
 * Clefs uniques d'authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clefs secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n'importe quel moment, afin d'invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '(g:&UAw~$o]-+YCZ)#5Go8@my`W.>,NR&w+`JhYBhu{8`*Ks,|Hh4Bm_XJm&n-]q');
define('SECURE_AUTH_KEY',  '|;Fh>&.rtnr q+|,w(BZV$M>~%p4#U! =U&.3l9ahhhhqq`SebP7iHQ3[g=;-I?w');
define('LOGGED_IN_KEY',    'Gn=@E]eZ~|D*I2c>%v]@Uc-N=<?jo/p9MK%spK,;fmD-C>Q)BIO!TI=EyZ--ehB#');
define('NONCE_KEY',        '%LsK&?)Q?z`OunF:rS4J(wt{xj}G`8$#w)>qf9f ln5jA1fRc3fhz@K|$Wq>TH=o');
define('AUTH_SALT',        'qt8*Rc62[WE-lYEMhKmNP4DS+~u@m^_P`:@+nTJSdz-Rm=+5 |&eF18i&0>?CVIB');
define('SECURE_AUTH_SALT', 'qk+,YlAxbp ze=IDJ~5ISp6i8Hsq7IyP|!,$Kc|JxHxc3TsGQR`GAs McA%t|aPg');
define('LOGGED_IN_SALT',   '?%;l^x9&-)(ev#973$lO(tl&7`Oa#{@a2_5*P>Jmsm=J$~tk|BE#FdU{v0R&g2.1');
define('NONCE_SALT',       '2x]u8Ti_(<W.82*}|F,4B[A~v; HI_M%o,lS>|$ID(V$uVxVygIq++,|<kR1kZy^');
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N'utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés!
 */
$table_prefix  = 'wp_';

/**
 * Pour les développeurs : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l'affichage des
 * notifications d'erreurs pendant vos essais.
 * Il est fortemment recommandé que les développeurs d'extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 *
 * Vous changerez aussi les fichiers appelés par le thème (minifiés vs full) et les accès BO (install plugin et thème).
 */
define('WP_DEBUG', true);


// NO trailing slash!
define( 'WP_SITEURL', 'http://dev.semaine-societariat.fr' );
define( 'WP_HOME', WP_SITEURL );

	
/** Specify whether to load Advanced Custom Fields configuration from wp_posts (true) or a PHP export file (false) */
define( 'USE_LOCAL_ACF_CONFIGURATION', true );


if ( WP_DEBUG === false ) {
	// Disable the theme and plugin installers and editors...
	define( 'DISALLOW_FILE_MODS', true );

	// ...or just disable the theme/plugin editor
	define( 'DISALLOW_FILE_EDIT', true );
}

/* C'est tout, ne touchez pas à ce qui suit ! Bon blogging ! */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');