<section id="section-1">
	<div class="section-1">
	<div class="section-1__background">
		<img src="<?php echo get_field('background')['url']; ?>" alt="">
	</div>
	<div class="section-1__left">
		<div class="section-1__left__content">
			<img class="section-1__left__content__title" src="<?php echo get_field('titre')['url']; ?>" alt="<?php echo get_field('titre')['alt']; ?>">
			<div class="section-1__left__content__encart">
				<?php the_field('encart'); ?>
			</div>
			<a href="#" class="section-1__left__content__btn">
				C'est par ici
			</a>
			<div class="section-1__left__content__help hidden"><?php the_field('aide'); ?></div>
		</div>
	</div>
	<div class="section-1__right">
		<div class="section-1__right__content">
			<div class="section-1__right__content__text"><?php the_field('decouvrez_le_programme'); ?></div>
			<?php
			if( have_rows('bouton_decouvrez_le_programme') ) :
				while ( have_rows('bouton_decouvrez_le_programme') ) : the_row(); ?>
			<a class="section-1__right__content__btn" href="#"><span><?php the_sub_field('texte'); ?></span></a>
				<?php endwhile;
			endif; ?>
		</div>
	</div>
	<div class="popin-agences__background hidden"></div>
	<div class="popin-agences hidden">
		<h2><?php the_field('titre_popin'); ?></h2>
		<ul class="agences">
			<?php
			if( have_rows('regions') ) :
				while ( have_rows('regions') ) : the_row(); ?>
			<li class="region">
				<h3><?php the_sub_field('region'); ?></h3>
				<ul>
				<?php
			if( have_rows('agence') ) :
				while ( have_rows('agence') ) : the_row(); ?>
				<li class="agence">
					<h4><?php the_sub_field('ville'); ?></h4>
					<div class="agence__adresse"><?php the_sub_field('adresse'); ?></div>
				</li>

					<?php endwhile;
				endif; ?>
			</ul>
			</li>
				<?php endwhile;
			endif; ?>
		</ul>
	</div>
	
	<a href="<?php echo get_permalink(69); ?>" target="_blank" class="section-1__mentions">Mentions légales</a>
	
	</div>
</section>