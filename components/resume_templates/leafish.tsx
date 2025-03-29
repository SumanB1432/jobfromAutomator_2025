"use client";
import React from "react";
import {
  usePersonalDataStore,
  useCertificateStore,
  useAchievementStore,
  useExperienceStore,
  useEducationStore,
  useProjectStore,
  useLanguageStore,
  useSkillStore,
} from "@/app/store";

export default function Leafish() {
  const { personalData } = usePersonalDataStore();
  const { certificates } = useCertificateStore();
  const { achievements } = useAchievementStore();
  const { experiences } = useExperienceStore();
  const { educations } = useEducationStore();
  const { projects } = useProjectStore();
  const { languages } = useLanguageStore();
  const { skills } = useSkillStore();

  return (
    <div className="bg-white text-gray-800 max-w-3xl mx-auto p-6 font-sans">
      {/* Header Section */}
      <header className="text-center space-y-1 mb-6">
        <h1 className="text-3xl font-bold text-teal-700">{personalData.name}</h1>
        <h2 className="text-sm text-gray-600">{personalData.headline}</h2>

        {(personalData.address ||
          personalData.phone ||
          personalData.github ||
          personalData.email ||
          personalData.twitter ||
          personalData.linkedin) && (
          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500 mt-3">
            {personalData.address && <div>{personalData.address}</div>}
            {personalData.phone && <div>{personalData.phone}</div>}
            {personalData.email && <div>{personalData.email}</div>}
            {personalData.github && <div>{personalData.github}</div>}
            {personalData.twitter && <div>{personalData.twitter}</div>}
            {personalData.linkedin && <div>{personalData.linkedin}</div>}
          </div>
        )}
      </header>

      <main className="space-y-6">
        {/* AWARDS */}
        {!!achievements.length && (
          <section className="border-t border-gray-200 pl-4">
            <h3 className="text-teal-700 font-semibold text-sm mb-2">
              AWARDS
            </h3>
            {achievements.map((achievement, index) => (
              <div key={index} className="mb-2">
                <div className="font-medium">{achievement.name}</div>
                <p className="text-gray-700 text-sm">{achievement.details}</p>
              </div>
            ))}
          </section>
        )}

        {/* CERTIFICATIONS */}
        {!!certificates.length && (
          <section className="border-t border-gray-200 pl-4">
            <h3 className="text-teal-700 font-semibold text-sm mb-2">
              CERTIFICATIONS
            </h3>
            {certificates.map((certificate, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{certificate.title}</span>
                  <span className="text-gray-500 text-xs">
                    {certificate.date}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{certificate.awarder}</p>
              </div>
            ))}
          </section>
        )}

        {/* LANGUAGES */}
        {!!languages.length && (
          <section className="border-t border-gray-200 pl-4">
            <h3 className="text-teal-700 font-semibold text-sm mb-2">
              LANGUAGES
            </h3>
            {languages.map((language, index) => (
              <div key={index} className="mb-2">
                <div className="font-medium">{language.heading}</div>
                <p className="text-gray-700 text-sm">{language.option}</p>
              </div>
            ))}
          </section>
        )}

        {/* WORK EXPERIENCE */}
        {!!experiences.length && (
          <section className="border-t border-gray-200 pl-4">
            <h3 className="text-teal-700 font-semibold text-sm mb-2">
              WORK EXPERIENCE
            </h3>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">
                    {exp.company}, {exp.location}
                  </span>
                  <span className="text-gray-500">{exp.dateRange}</span>
                </div>
                <p className="italic text-gray-700 text-sm mb-2">
                  {exp.position}
                </p>
                {exp.description && (
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    {exp.description.split(",").map((detail, i) => (
                      <li key={i}>{detail.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* EDUCATION */}
        {!!educations.length && (
          <section className="border-t border-gray-200 pl-4">
            <h3 className="text-teal-700 font-semibold text-sm mb-2">
              EDUCATION
            </h3>
            {educations.map((edu, index) => (
              <div key={index} className="mb-2 text-sm">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{edu.institute}</div>
                    <p className="text-gray-700">
                      {edu.typeofstudy} in {edu.areaofstudy}
                    </p>
                  </div>
                  <div className="text-gray-500 text-right text-xs">
                    {edu.dateRange}
                    {edu.score && (
                      <p className="text-gray-700 text-xs">{edu.score}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* SKILLS */}
        {!!skills.length && (
          <section className="border-t border-gray-200 pl-4">
            <h3 className="text-teal-700 font-semibold text-sm mb-2">
              SKILLS
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="font-medium mb-1">{skill.heading}</div>
                  {skill.items &&
                    skill.items.split(",").map((detail, i) => (
                      <p key={i} className="text-gray-700">
                        {detail.trim()}
                      </p>
                    ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {!!projects.length && (
          <section className="border-t border-gray-200 pl-4">
            <h3 className="text-teal-700 font-semibold text-sm mb-2">
              PROJECTS
            </h3>
            {projects.map((proj, index) => (
              <div key={index} className="mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">
                    {proj.website ? (
                      <a
                        href={proj.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-gray-800 hover:text-gray-600"
                      >
                        {proj.name}
                      </a>
                    ) : (
                      proj.name
                    )}
                  </span>
                  <span className="text-gray-500">{proj.date}</span>
                </div>
                <p className="text-gray-700">{proj.description}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
