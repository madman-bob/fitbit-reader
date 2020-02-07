registerSettingsPage(() => (
    <Page>
        <Section
            title={
                <Text bold align="center">
                    Reader Settings
                </Text>
            }>
            <AdditiveList
                title="Feed URLs"
                settingsKey="feedUrls"
                addAction={
                    <TextInput
                        label="Add Feed"
                        placeholder="https://feed.example.com/rss.xml"
                        type="url"
                    />
                }
            />
        </Section>
    </Page>
));
