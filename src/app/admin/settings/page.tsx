import { SettingsPageContent } from '@/components/settings/content';

export default function SettingsPage() {
	return (
		<>
			<div className="flex flex-col p-6 text-white/90">
				<div className="flex items-center justify-between">
					<h1 className="font-heading font-semibold text-2xl md:text-3xl tracking-wide text-white uppercase">
						Account Settings
					</h1>
				</div>
			</div>
			<SettingsPageContent />
		</>
	);
}
