<template>
	<div class="bg-canvas min-h-screen text-ink antialiased selection:bg-ink selection:text-canvas">
		<NuxtLoadingIndicator
			color="#18181B"
			:height="2"
			:duration="2000"
			:throttle="0"
		/>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
