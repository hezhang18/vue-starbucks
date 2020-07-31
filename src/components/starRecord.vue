<template>
	<div>
		<div>
			<select name="StarType" class="star-type" v-model="StarType">
				<option value="level">等级星星</option>
				<option value="reward">好礼星星</option>
			</select>
		</div>
		<component v-bind:is="view"></component>
	</div>
</template>

<script>
	import StarLevel from '@/components/starLevel'
	import StarReward from '@/components/starReward'

	export default {
		data(){
			return {
				StarType: 'level',
			}
		},
		computed: {
			view(){
				return this.StarType === 'level' ? 'StarLevel' : 'StarReward';
			}
		},
		components: {
			StarLevel: StarLevel,
			StarReward: StarReward
		}
	}
</script>