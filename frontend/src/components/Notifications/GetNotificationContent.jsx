export const getNotificationContent = (notif, t) => {
    const eventKey = notif?.type || notif?.title || "";

    const data =
        typeof notif?.data === "string"
            ? JSON.parse(notif.data)
            : notif?.data || {};
    console.log(notif, eventKey, data);
    // ACHIEVEMENT
    const achievementSlug = data?.achievementSlug;

    const achievementName = achievementSlug
        ? t(`achievements.achievementsData.${achievementSlug}.title`, {
            defaultValue: achievementSlug,
        })
        : "";

    // RANK
    const rankSlug =
        data?.newRank?.icon ||
        data?.newRank?.slug ||
        data?.newRank?.name;

    const rankName = rankSlug
        ? t(`achievements.ranks.${rankSlug}.name`, {
            defaultValue: data?.newRank?.name || rankSlug,
        })
        : "";

    const title = t(`notifications.events.${eventKey}.title`, {
        defaultValue: notif?.title || "Notification",
    });

    const body = t(`notifications.events.${eventKey}.message`, {
        defaultValue: notif?.body || notif?.message || "",
        achievementName,
        rankName,
        xp: data?.xp,
    });

    return {
        title,
        body,
        data,
    };
};