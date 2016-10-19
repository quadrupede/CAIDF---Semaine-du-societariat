# wordpress
Boilerplate Wordpress

Ce projet necessite Git, Node.js, Sass et Dploy. Installez les s'ils ne sont pas sur votre machine

1) Récupérez le dépôt sur votre machine locale

2) Ouvrez boilerplate.sql et modifiez dev.boilerplate.com par l'url du site. Importez ensuite le fichier

3) Mettez à jour le wp-config : 
ligne 22 à 31 : db
ligne 52 à 59 : auth key à générer (via https://api.wordpress.org/secret-key/1.1/salt/)
ligne 82 : debug (change les acces BO et les assets (minifiés ou non))
ligne 86 : url du site
ligne 91 : TRUE pour une install de dev ou l'on va ajouter des champs acf (récupérer l'export xml des autres install si besoin) ou false sinon

4) .htaccess
ligne 9 : url du site de prod (pour récupérer les uploads directement en prod)

5) dploy.yaml
Ajoutez vos infos de connections de serveurs de Dev et de Prod. Vous pourrez ensuite deployer sur ces deux serveurs en tapant <code>dploy nom_du_serveur</code> dans le terminal à la racine du projet.

6) Installation du thème :

6.1) Renommez le dossier du thème en fonction du site

6.2) Ouvrez un terminal dans le dossier du thème et lancez <code>npm install</code> afin d'installer tout les plugins gulp nécessaires (listés dans package.json)

6.3) Changez les variables de configuration du projet dans gulpfile.js :
ligne 12 : url locale du projet

6.4) Modifiez les infos du thème dans le fichier src/scss/style.scss

6.5) Lancez <code>gulp</code> dans le terminal afin de générer une build et de lancer un watch

6.6) Copiez collez screenshot.png du dossier src au dossier build (ToDo : automatisation)

6.7) Tout les fichiers sources sont dans src. Toutes les modifications doivent donc être faites dans ce dossier. Les .scss, .js, .php et images seront traités automatiquement. Un sprite sera généré automatiquement à partir des .png présents dans le dossier src/img/sprites. Les .svg seront copiés depuis le dossier svg

6.8) Installez des librairies ou framework externes via <code>npm install nomDeLaLib --save</code>. Ajoutez ensuite le lien des js dans gulpfile.js (ligne 14) et les liens des css/scss dans style.scss

6.9) Le fichier acf.php doit contenir les exports php de tout les champs ACF. N'oubliez pas de faire un export XML afin de pouvoir les modifier par la suite sur votre copie de travail.